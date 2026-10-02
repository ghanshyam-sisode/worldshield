from sqlalchemy import Column, String, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.models.base import BaseModel

class ValidationRun(BaseModel):
    __tablename__ = "validation_runs"

    finding_id = Column(String, ForeignKey("findings.id"), nullable=False, index=True)
    assessment_id = Column(String, ForeignKey("assessments.id"), nullable=False, index=True)
    
    environment = Column(String, nullable=False)
    mode = Column(String, nullable=False) # simulation, isolated_local, authorized_staging
    status = Column(String, nullable=False) # passed, failed, running, error
    
    authorization_context = Column(String)
    expected_result = Column(String)
    observed_result = Column(String)
    safety_checks = Column(String)
    
    started_at = Column(DateTime(timezone=True))
    completed_at = Column(DateTime(timezone=True))
    output_summary = Column(String)
    
    finding = relationship("Finding")
    assessment = relationship("Assessment")
