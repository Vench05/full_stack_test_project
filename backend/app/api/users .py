from fastapi import APIRouter
from app.schema.user_schema import UserRequest


router = APIRouter()


@router.post('/register')
def register_user(user: UserRequest):
    pass
