from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.logging import logger
from app.api.v1.router import api_router
from app.core.exceptions import WorldShieldError, worldshield_exception_handler
import uuid

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="WorldShield - Evidence-First, Version-Aware Security Assessment Platform"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request ID middleware
@app.middleware("http")
async def add_request_id(request: Request, call_next):
    request_id = request.headers.get("X-Request-ID", str(uuid.uuid4()))
    request.state.request_id = request_id
    response = await call_next(request)
    response.headers["X-Request-ID"] = request_id
    # Add Security Headers
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    return response

# Exception handlers
app.add_exception_handler(WorldShieldError, worldshield_exception_handler)

# Include API router
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/health")
def root_health():
    return {"status": "ok", "version": settings.VERSION, "environment": settings.WORLDSHIELD_ENV}

@app.get("/ready")
def root_ready():
    # TODO: Check DB/storage
    return {"status": "ok"}
