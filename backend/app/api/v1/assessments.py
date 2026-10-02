from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.schemas.assessment import AssessmentSchema, AssessmentCreate
from app.repositories.assessment_repo import assessment_repo, AssessmentUpdate
from app.core.exceptions import NotFoundError

router = APIRouter()

@router.get("/", response_model=List[AssessmentSchema])
def list_assessments(db: Session = Depends(get_db), skip: int = 0, limit: int = 100):
    return assessment_repo.get_multi(db, skip=skip, limit=limit)

@router.post("/", response_model=AssessmentSchema)
def create_assessment(assessment: AssessmentCreate, db: Session = Depends(get_db)):
    return assessment_repo.create(db, obj_in=assessment)

@router.get("/{id}", response_model=AssessmentSchema)
def get_assessment(id: str, db: Session = Depends(get_db)):
    assessment = assessment_repo.get(db, id=id)
    if not assessment:
        raise NotFoundError("Assessment not found")
    return assessment

@router.patch("/{id}", response_model=AssessmentSchema)
def update_assessment(id: str, assessment_in: AssessmentUpdate, db: Session = Depends(get_db)):
    assessment = assessment_repo.get(db, id=id)
    if not assessment:
        raise NotFoundError("Assessment not found")
    return assessment_repo.update(db, db_obj=assessment, obj_in=assessment_in)

@router.delete("/{id}", response_model=AssessmentSchema)
def delete_assessment(id: str, db: Session = Depends(get_db)):
    assessment = assessment_repo.get(db, id=id)
    if not assessment:
        raise NotFoundError("Assessment not found")
    return assessment_repo.remove(db, id=id)
