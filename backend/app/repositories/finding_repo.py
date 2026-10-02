from app.repositories.base import CRUDBase
from app.models.finding import Finding
from app.schemas.finding import FindingCreate, FindingUpdate
from sqlalchemy.orm import Session
from typing import List, Optional

class CRUDFinding(CRUDBase[Finding, FindingCreate, FindingUpdate]):
    def get_by_assessment(self, db: Session, assessment_id: str) -> List[Finding]:
        return db.query(self.model).filter(self.model.assessment_id == assessment_id).all()

finding_repo = CRUDFinding(Finding)
