from sqlalchemy import Column, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.models.base import BaseModel

class RegressionTest(BaseModel):
    __tablename__ = "regression_tests"

    finding_id = Column(String, ForeignKey("findings.id"), nullable=False, index=True)
    assessment_id = Column(String, ForeignKey("assessments.id"), nullable=False, index=True)
    
    name = Column(String, nullable=False)
    description = Column(String)
    expected_result = Column(String)
    test_type = Column(String)
    version = Column(String)
    status = Column(String)
    last_run = Column(DateTime(timezone=True))
    
    finding = relationship("Finding")
    assessment = relationship("Assessment")
