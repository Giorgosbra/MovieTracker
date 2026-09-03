from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session

from backend.app.database.database import get_session
from backend.app.schemas.user import UserCreate, UserRead
from backend.app.schemas.auth import LoginRequest, TokenResponse
from backend.app.services.user_service import UserService


# Router responsible for authentication endpoints.
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
    """
    Register a new user account.

    Parameters:
    user_data (UserCreate): The validated registration data.
    session (Session): The active database session.

    Returns:
    UserRead: The newly created user.

    Raises:
    HTTPException: If the email or username is already registered.
    """
    service = UserService(session)

    try:
        # Delegate the registration business logic to the service layer.
        return service.register(user_data)

    except ValueError as error:
        # Convert service-layer validation errors into an HTTP 400 response.
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
    """
    Authenticate a user and return a JWT access token.

    Parameters:
    login_data (LoginRequest): The submitted email and password.
    session (Session): The active database session.

    Returns:
    TokenResponse: The generated access token and token type.

    Raises:
    HTTPException: If the submitted credentials are invalid.
    """
    service = UserService(session)

    try:
        # Authenticate the user and generate the JWT access token.
        token = service.login(login_data)

        return TokenResponse(
            access_token=token,
            token_type="bearer"
        )

    except ValueError as error:
        # Invalid credentials are returned as an HTTP 401 response.
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=str(error)
        )
    

































    