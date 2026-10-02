from app.repositories.base import CRUDBase
from app.models.assessment import Assessment
from app.schemas.assessment import AssessmentCreate
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import List

class AssessmentUpdate(BaseModel):
    status: str | None = None
    progress: int | None = None
    finding_count: int | None = None
    confirmed_count: int | None = None

class CRUDAssessment(CRUDBase[Assessment, AssessmentCreate, AssessmentUpdate]):
    def get_by_project(self, db: Session, project_id: str) -> List[Assessment]:
        return db.query(self.model).filter(self.model.project_id == project_id).all()

assessment_repo = CRUDAssessment(Assessment)
