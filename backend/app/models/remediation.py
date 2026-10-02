from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from app.models.base import BaseModel

class Remediation(BaseModel):
    __tablename__ = "remediations"

    finding_id = Column(String, ForeignKey("findings.id"), nullable=False, index=True)
    
    root_cause = Column(String)
    recommendation = Column(String)
    priority = Column(String)
    owner = Column(String)
    status = Column(String) # suggested, planned, in_progress, ready_for_validation, verified, rejected, accepted_risk
    
    implementation_guidance = Column(String)
    validation_criteria = Column(String)
    
    finding = relationship("Finding")
