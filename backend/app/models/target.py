from sqlalchemy import Column, String, Boolean, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.models.base import BaseModel

class Target(BaseModel):
    __tablename__ = "targets"

    project_id = Column(String, ForeignKey("projects.id"), nullable=False, index=True)
    name = Column(String, nullable=False)
    target_type = Column(String, nullable=False) # repository, local_directory, zip, running_local, benchmark
    repository = Column(String)
    default_branch = Column(String)
    environment = Column(String, nullable=False) # local, staging, authorized_remote, benchmark
    authorized = Column(Boolean, default=False)
    allowed_hosts = Column(JSON)

    project = relationship("Project")
