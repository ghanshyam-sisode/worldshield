from fastapi import HTTPException
from fastapi.responses import JSONResponse
import logging

logger = logging.getLogger("worldshield")

class WorldShieldError(Exception):
    def __init__(self, message: str, code: str = "INTERNAL_ERROR", status_code: int = 500):
        self.message = message
        self.code = code
        self.status_code = status_code
        super().__init__(self.message)

class NotFoundError(WorldShieldError):
    def __init__(self, message: str = "Resource not found"):
        super().__init__(message, "NOT_FOUND", 404)

class ValidationError(WorldShieldError):
    def __init__(self, message: str = "Validation failed"):
        super().__init__(message, "VALIDATION_ERROR", 422)

class AuthorizationError(WorldShieldError):
    def __init__(self, message: str = "Not authorized"):
        super().__init__(message, "UNAUTHORIZED", 401)

class ScopeViolationError(WorldShieldError):
    def __init__(self, message: str = "Scope violation"):
        super().__init__(message, "SCOPE_VIOLATION", 403)

class ToolUnavailableError(WorldShieldError):
    def __init__(self, message: str = "Tool unavailable"):
        super().__init__(message, "TOOL_UNAVAILABLE", 503)

class AssessmentStateError(WorldShieldError):
    def __init__(self, message: str = "Invalid assessment state"):
        super().__init__(message, "INVALID_STATE", 409)

def worldshield_exception_handler(request, exc: WorldShieldError):
    logger.error(f"Error handling request: {exc.code} - {exc.message}")
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": {
                "code": exc.code,
                "message": exc.message,
                # "request_id": request.state.request_id # TODO: add request ID
            }
        },
    )
