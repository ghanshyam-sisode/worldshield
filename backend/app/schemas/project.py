from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime
from .common import BaseEntitySchema

class ProjectBase(BaseModel):
    name: str
    description: Optional[str] = None

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None

class ProjectSchema(ProjectBase, BaseEntitySchema):
    archived_at: Optional[datetime] = None
