from fastapi import APIRouter, Depends
from fastapi.exceptions import HTTPException
from sqlalchemy.orm.session import Session

from app.schema.user_schema import UserRequest, UserResponse, UserUpdateRequest
from app.crud.user import \
    create_user, \
    get_user_by_username, \
    verify_password, \
    get_user, \
    update_user_use_case
from app.database import get_db


router = APIRouter()


@router.post('/register', response_model=UserResponse, status_code=200)
def register_user(user: UserRequest, db: Session = Depends(get_db)):
    if get_user_by_username(username=user.username, db=db):
        raise HTTPException(
            detail={'msg': 'User already registered', 'result': 'error'},
            status_code=409
        )
    return create_user(data=user, db=db)


@router.post('/login', response_model=UserResponse, status_code=200)
def login(user: UserRequest, db: Session = Depends(get_db)):
    user_db = get_user_by_username(username=user.username, db=db)
    if not user_db:
        raise HTTPException(status_code=404,
                            detail='Invalid Username or Password')

    if not verify_password(password=user.password, hashed_password=user_db.password):
        raise HTTPException(status_code=404,
                            detail='Invalid Username or Password')

    return user_db


@router.put('/{id}/update', response_model=UserResponse, status_code=200)
def update_user(id: int, user_data: UserUpdateRequest, db: Session = Depends(get_db)):
    user = get_user(user_id=id, db=db)
    if not user:
        raise HTTPException(status_code=404,
                            detail=f'User ID: {id} not found')

    return update_user_use_case(id=id, data=user_data, db=db)
