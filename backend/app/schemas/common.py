from pydantic import BaseModel, ConfigDict
from typing import Generic, TypeVar, List, Optional
from datetime import datetime

T = TypeVar('T')

class Pagination(BaseModel):
    page: int
    page_size: int
    total: int

class PaginatedResponse(BaseModel, Generic[T]):
    data: List[T]
    pagination: Pagination

class StandardResponse(BaseModel, Generic[T]):
    data: T
    meta: Optional[dict] = None

class BaseSchema(BaseModel):
    model_config = ConfigDict(from_attributes=True)

class BaseEntitySchema(BaseSchema):
    id: str
    created_at: datetime
    updated_at: datetime
