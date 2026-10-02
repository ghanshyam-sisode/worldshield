from sqlalchemy import Column, String, Integer, ForeignKey, JSON, DateTime
from sqlalchemy.orm import relationship
from app.models.base import BaseModel

class Assessment(BaseModel):
    __tablename__ = "assessments"

    project_id = Column(String, ForeignKey("projects.id"), nullable=False, index=True)
    target_id = Column(String, ForeignKey("targets.id"), nullable=False, index=True)
    name = Column(String, nullable=False)
    assessment_type = Column(String, nullable=False)
    profile = Column(String, nullable=False)
    snapshot_id = Column(String, nullable=True) # Will link to Snapshot later
    environment = Column(String, nullable=False)
    status = Column(String, nullable=False, default="draft")
    
    progress = Column(Integer, default=0)
    risk_score = Column(Integer, default=0)
    files_scanned = Column(Integer, default=0)
    tests_total = Column(Integer, default=0)
    tests_completed = Column(Integer, default=0)
    finding_count = Column(Integer, default=0)
    confirmed_count = Column(Integer, default=0)
    needs_review_count = Column(Integer, default=0)
    
    created_by = Column(String, nullable=True)
    started_at = Column(DateTime(timezone=True), nullable=True)
    completed_at = Column(DateTime(timezone=True), nullable=True)

    project = relationship("Project")
    target = relationship("Target")
