from app.repositories.base import CRUDBase
from app.models.target import Target
from app.schemas.target import TargetCreate, TargetUpdate
from sqlalchemy.orm import Session
from typing import List

class CRUDTarget(CRUDBase[Target, TargetCreate, TargetUpdate]):
    def get_by_project(self, db: Session, project_id: str) -> List[Target]:
        return db.query(self.model).filter(self.model.project_id == project_id).all()

target_repo = CRUDTarget(Target)
