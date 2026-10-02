from sqlalchemy import Column, String, Integer, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.models.base import BaseModel

class Evidence(BaseModel):
    __tablename__ = "evidence"

    finding_id = Column(String, ForeignKey("findings.id"), nullable=False, index=True)
    assessment_id = Column(String, ForeignKey("assessments.id"), nullable=False, index=True)
    
    type = Column(String, nullable=False) # source_code, request, response, screenshot, log, etc
    source = Column(String) # engine or manual
    snapshot_id = Column(String)
    
    file = Column(String)
    line_start = Column(Integer)
    line_end = Column(Integer)
    
    content = Column(String) # the excerpt
    content_hash = Column(String)
    integrity_status = Column(String, default="verified") # verified, tampered, unknown
    metadata_json = Column(JSON)
    
    finding = relationship("Finding")
    assessment = relationship("Assessment")
