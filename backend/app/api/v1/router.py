from fastapi import APIRouter
from app.api.v1 import projects, targets, assessments, findings

api_router = APIRouter()

api_router.include_router(projects.router, prefix="/projects", tags=["projects"])
api_router.include_router(targets.router, prefix="/targets", tags=["targets"])
api_router.include_router(assessments.router, prefix="/assessments", tags=["assessments"])
api_router.include_router(findings.router, prefix="/findings", tags=["findings"])
