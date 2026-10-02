from sqlalchemy import Column, String, Integer, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.models.base import BaseModel

class Finding(BaseModel):
    __tablename__ = "findings"

    project_id = Column(String, ForeignKey("projects.id"), nullable=False, index=True)
    assessment_id = Column(String, ForeignKey("assessments.id"), nullable=False, index=True)
    target_id = Column(String, ForeignKey("targets.id"), nullable=False, index=True)
    
    title = Column(String, nullable=False)
    description = Column(String)
    category = Column(String)
    severity = Column(String) # critical, high, medium, low, informational
    confidence = Column(String) # confirmed, high, medium, low
    status = Column(String) # new, open, in_review, confirmed, needs_review, remediated, regression_passed, regression_failed, accepted_risk, false_positive
    
    component = Column(String)
    file = Column(String)
    line_start = Column(Integer)
    line_end = Column(Integer)
    
    snapshot_id = Column(String)
    context = Column(String) # historical, simulated, current
    
    cwe = Column(JSON)
    owasp = Column(JSON)
    
    # Simple JSON representation for demo risk payload
    cvss = Column(JSON)
    
    project = relationship("Project")
    assessment = relationship("Assessment")
    target = relationship("Target")
