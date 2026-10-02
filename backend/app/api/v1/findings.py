from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.database import get_db
from app.schemas.finding import FindingSchema, FindingCreate, FindingUpdate
from app.repositories.finding_repo import finding_repo
from app.core.exceptions import NotFoundError

router = APIRouter()

@router.get("/", response_model=List[FindingSchema])
def list_findings(db: Session = Depends(get_db), assessment_id: Optional[str] = None, skip: int = 0, limit: int = 100):
    if assessment_id:
        return finding_repo.get_by_assessment(db, assessment_id=assessment_id)
    return finding_repo.get_multi(db, skip=skip, limit=limit)

@router.post("/", response_model=FindingSchema)
def create_finding(finding: FindingCreate, db: Session = Depends(get_db)):
    return finding_repo.create(db, obj_in=finding)

@router.get("/{id}", response_model=FindingSchema)
def get_finding(id: str, db: Session = Depends(get_db)):
    finding = finding_repo.get(db, id=id)
    if not finding:
        raise NotFoundError("Finding not found")
    return finding

@router.patch("/{id}", response_model=FindingSchema)
def update_finding(id: str, finding_in: FindingUpdate, db: Session = Depends(get_db)):
    finding = finding_repo.get(db, id=id)
    if not finding:
        raise NotFoundError("Finding not found")
    return finding_repo.update(db, db_obj=finding, obj_in=finding_in)
