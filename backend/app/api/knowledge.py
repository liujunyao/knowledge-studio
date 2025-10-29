"""
Knowledge Points API endpoints
"""
from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def list_knowledge_points():
    """List all knowledge points"""
    return {"message": "Knowledge points endpoint - TODO"}

@router.post("/")
async def create_knowledge_point():
    """Create a new knowledge point"""
    return {"message": "Create knowledge point - TODO"}
