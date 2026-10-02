from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime
from .common import BaseEntitySchema

class EvidenceBase(BaseModel):
    finding_id: str
    assessment_id: str
    type: str
    source: Optional[str] = None
    snapshot_id: Optional[str] = None
    file: Optional[str] = None
    line_start: Optional[int] = None
    line_end: Optional[int] = None
    content: Optional[str] = None
    content_hash: Optional[str] = None
    integrity_status: Optional[str] = "verified"
    metadata_json: Optional[Dict[str, Any]] = None

class EvidenceSchema(EvidenceBase, BaseEntitySchema):
    pass

class FindingBase(BaseModel):
    project_id: str
    assessment_id: str
    target_id: str
    title: str
    description: Optional[str] = None
    category: Optional[str] = None
    severity: Optional[str] = None
    confidence: Optional[str] = None
    status: Optional[str] = None
    component: Optional[str] = None
    file: Optional[str] = None
    line_start: Optional[int] = None
    line_end: Optional[int] = None
    snapshot_id: Optional[str] = None
    context: Optional[str] = None
    cwe: Optional[List[str]] = None
    owasp: Optional[List[str]] = None
    cvss: Optional[Dict[str, Any]] = None

class FindingCreate(FindingBase):
    pass

class FindingUpdate(BaseModel):
    status: Optional[str] = None
    confidence: Optional[str] = None

class FindingSchema(FindingBase, BaseEntitySchema):
    pass

class ValidationRunBase(BaseModel):
    finding_id: str
    assessment_id: str
    environment: str
    mode: str
    status: str
    authorization_context: Optional[str] = None
    expected_result: Optional[str] = None
    observed_result: Optional[str] = None
    safety_checks: Optional[str] = None
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    output_summary: Optional[str] = None

class ValidationRunSchema(ValidationRunBase, BaseEntitySchema):
    pass

class RemediationBase(BaseModel):
    finding_id: str
    root_cause: Optional[str] = None
    recommendation: Optional[str] = None
    priority: Optional[str] = None
    owner: Optional[str] = None
    status: Optional[str] = None
    implementation_guidance: Optional[str] = None
    validation_criteria: Optional[str] = None

class RemediationSchema(RemediationBase, BaseEntitySchema):
    pass

class RegressionTestBase(BaseModel):
    finding_id: str
    assessment_id: str
    name: str
    description: Optional[str] = None
    expected_result: Optional[str] = None
    test_type: Optional[str] = None
    version: Optional[str] = None
    status: Optional[str] = None
    last_run: Optional[datetime] = None

class RegressionTestSchema(RegressionTestBase, BaseEntitySchema):
    pass

class FindingDetailSchema(FindingSchema):
    evidence_ids: List[str] = Field(default_factory=list)
    validation: Optional[ValidationRunSchema] = None
    remediation: Optional[RemediationSchema] = None
    regression: Optional[RegressionTestSchema] = None
