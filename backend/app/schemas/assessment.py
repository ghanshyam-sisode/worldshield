from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime
from .common import BaseEntitySchema

class AssessmentBase(BaseModel):
    project_id: str
    target_id: str
    name: str
    assessment_type: str
    profile: str
    environment: str

class AssessmentCreate(AssessmentBase):
    pass

class AssessmentSchema(AssessmentBase, BaseEntitySchema):
    snapshot_id: Optional[str] = None
    status: str
    progress: int
    risk_score: int
    files_scanned: int
    tests_total: int
    tests_completed: int
    finding_count: int
    confirmed_count: int
    needs_review_count: int
    created_by: Optional[str] = None
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
