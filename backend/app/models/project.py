from sqlalchemy import Column, String, DateTime
from app.models.base import BaseModel

class Project(BaseModel):
    __tablename__ = "projects"

    name = Column(String, nullable=False)
    description = Column(String)
    archived_at = Column(DateTime(timezone=True), nullable=True)
