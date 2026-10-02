from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from .common import BaseEntitySchema

class TargetBase(BaseModel):
    project_id: str
    name: str
    target_type: str
    repository: Optional[str] = None
    default_branch: Optional[str] = None
    environment: str
    authorized: bool = False
    allowed_hosts: Optional[List[str]] = None

class TargetCreate(TargetBase):
    pass

class TargetUpdate(BaseModel):
    name: Optional[str] = None
    authorized: Optional[bool] = None

class TargetSchema(TargetBase, BaseEntitySchema):
    pass
