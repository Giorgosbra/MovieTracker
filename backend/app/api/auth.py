from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session

from backend.app.database.database import get_session
from backend.app.schemas.user import UserCreate, UserRead
from backend.app.schemas.auth import LoginRequest, TokenResponse
from backend.app.services.user_service import UserService


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post(
    "/register",
    response_model=UserRead,
    status_code=status.HTTP_201_CREATED
)
def register(
    user_data: UserCreate,
    session: Session = Depends(get_session)
):
    service = UserService(session)

    try:
        return service.register(user_data)

    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(error)
        )


@router.post(
    "/login",
    response_model=TokenResponse
)
def login(
    login_data: LoginRequest,
    session: Session = Depends(get_session)
):
    service = UserService(session)

    try:
        token = service.login(login_data)

        return TokenResponse(
            access_token=token,
            token_type="bearer"
        )

    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(error)
        )



    











    