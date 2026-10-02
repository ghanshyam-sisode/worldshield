from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List
import os

class Settings(BaseSettings):
    WORLDSHIELD_ENV: str = "development"
    WORLDSHIELD_HOST: str = "127.0.0.1"
    WORLDSHIELD_PORT: int = 8000
    
    # DB & Storage
    DATABASE_URL: str = "sqlite:///./worldshield.db"
    STORAGE_ROOT: str = "./storage"
    
    # API
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "WorldShield API"
    VERSION: str = "0.1.0"
    
    # Security / CORS — use plain strings so CORS middleware exact-matches origins
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ]
    
    # Feature Flags
    ENABLE_REAL_GIT_INGESTION: bool = False
    ENABLE_SEMGREP: bool = False
    ENABLE_GITLEAKS: bool = False
    ENABLE_NPM_AUDIT: bool = False
    ENABLE_CARGO_AUDIT: bool = False
    ENABLE_REMOTE_TARGETS: bool = False
    ENABLE_AI: bool = True
    ENABLE_BROWSER_ENGINE: bool = False
    ENABLE_TAURI_ENGINE: bool = True
    
    # Security Configuration
    ALLOW_REMOTE_TARGETS: bool = False
    ALLOW_REMOTE_VALIDATION: bool = False
    REQUIRE_AUTHORIZATION: bool = True
    SAFE_VALIDATION_ONLY: bool = True
    MAX_UPLOAD_MB: int = 50
    MAX_ARCHIVE_FILES: int = 5000
    SCAN_TIMEOUT_SECONDS: int = 600

    # Optional Tools
    REDIS_URL: str | None = None
    SEMgrep_PATH: str | None = None
    GITLEAKS_PATH: str | None = None
    NPM_PATH: str | None = None
    CARGO_PATH: str | None = None
    AI_PROVIDER: str | None = "mock"
    AI_API_KEY: str | None = None

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore"
    )

settings = Settings()
