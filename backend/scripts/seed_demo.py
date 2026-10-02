import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from app.core.database import SessionLocal, engine
from app.models import Base
from app.models.project import Project
from app.models.target import Target
from app.models.assessment import Assessment
from app.models.finding import Finding
from app.models.evidence import Evidence
from app.models.validation import ValidationRun
from app.models.remediation import Remediation
from app.models.regression import RegressionTest
from datetime import datetime, timezone, timedelta

def seed_database():
    # Base.metadata.drop_all(bind=engine)
    # Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    # Check if seeded
    if db.query(Project).first():
        print("Database already seeded. Skipping.")
        return

    print("Seeding database...")
    now = datetime.now(timezone.utc)
    
    project = Project(
        id="PROJ-001",
        name="World Monitor Security Program",
        description="Demo project for World Monitor security assessments.",
        created_at=now - timedelta(days=30)
    )
    db.add(project)
    
    target = Target(
        id="TGT-001",
        project_id=project.id,
        name="World Monitor",
        target_type="benchmark",
        environment="benchmark",
        authorized=True,
        created_at=now - timedelta(days=30)
    )
    db.add(target)
    
    assessment = Assessment(
        id="WM-ASM-2026-001",
        project_id=project.id,
        target_id=target.id,
        name="World Monitor Baseline",
        assessment_type="full",
        profile="World Monitor Full Assessment",
        environment="benchmark",
        status="completed",
        progress=100,
        risk_score=38,
        files_scanned=412,
        tests_total=248,
        tests_completed=248,
        finding_count=7,
        confirmed_count=2,
        needs_review_count=3,
        started_at=now - timedelta(hours=2),
        completed_at=now - timedelta(hours=1),
    )
    db.add(assessment)
    
    finding1 = Finding(
        id="WS-2026-0001",
        project_id=project.id,
        assessment_id=assessment.id,
        target_id=target.id,
        title="Cross-Tenant Alert Rule Disclosure",
        description="A public data-access path was identified that did not enforce a sufficient authentication/ownership boundary before reading tenant-sensitive alert-rule records in the affected benchmark snapshot.",
        category="Authorization",
        severity="High",
        confidence="Confirmed",
        status="confirmed",
        component="convex/alertRules.ts",
        file="convex/alertRules.ts",
        line_start=42,
        line_end=55,
        snapshot_id="16d0a12e",
        context="historical",
        cwe=["CWE-639", "CWE-285"],
        owasp=["A01:2021-Broken Access Control"],
        cvss={
            "version": "3.1",
            "score": 7.5,
            "vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N"
        },
        created_at=now - timedelta(hours=1, minutes=30)
    )
    db.add(finding1)
    
    evidence1 = Evidence(
        id="EV-0024",
        finding_id=finding1.id,
        assessment_id=assessment.id,
        type="source_code",
        source="benchmark",
        snapshot_id="16d0a12e",
        file="convex/alertRules.ts",
        line_start=42,
        line_end=55,
        content="export const listAlertRules = query({\n  // BUG: No ownership/tenant boundary enforced\n  handler: async (ctx) => {\n    return await ctx.db.query(\"alertRules\").collect();\n  },\n});",
        content_hash="e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        integrity_status="verified",
        created_at=now - timedelta(hours=1, minutes=25)
    )
    db.add(evidence1)
    
    validation1 = ValidationRun(
        id="VAL-0001",
        finding_id=finding1.id,
        assessment_id=assessment.id,
        environment="isolated_local",
        mode="simulation",
        status="failed",
        authorization_context="Tenant A / User A",
        expected_result="Unauthorized cross-tenant access denied",
        observed_result="Cross-tenant record visible in benchmark harness",
        safety_checks="Safe mode, local harness only",
        started_at=now - timedelta(hours=1, minutes=20),
        completed_at=now - timedelta(hours=1, minutes=19)
    )
    db.add(validation1)
    
    remediation1 = Remediation(
        id="REM-001",
        finding_id=finding1.id,
        root_cause="The `listAlertRules` Convex query did not apply an ownership filter.",
        recommendation="Add an identity check via `ctx.auth.getUserIdentity()` and filter the query by `tenantId` before returning results.",
        priority="High",
        owner="Dev Team",
        status="verified",
        implementation_guidance="Update convex/alertRules.ts to enforce auth",
        validation_criteria="Cross-tenant records should not be returned"
    )
    db.add(remediation1)
    
    regression1 = RegressionTest(
        id="REG-001",
        finding_id=finding1.id,
        assessment_id=assessment.id,
        name="TestCrossTenantAlertRead",
        description="Ensure tenant boundary is enforced when fetching alerts.",
        expected_result="PASS",
        test_type="integration",
        version="v1.4.2",
        status="passed",
        last_run=now - timedelta(minutes=10)
    )
    db.add(regression1)

    db.commit()
    print("Database seeded successfully.")

if __name__ == "__main__":
    seed_database()
