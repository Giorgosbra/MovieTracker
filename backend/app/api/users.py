from fastapi import APIRouter, Depends

from backend.app.api.dependencies import get_current_user
from backend.app.models.user import User
from backend.app.schemas.user import UserRead


# Router responsible for user-related endpoints.
router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.get(
    "/me",
    response_model=UserRead
)
def get_me(
    current_user: User = Depends(get_current_user)
):
    """
    Retrieve the currently authenticated user's account information.

    Parameters:
    current_user (User): The authenticated user returned by get_current_user.

    Returns:
    UserRead: The authenticated user's public account information.
    """
    # get_current_user validates the JWT token before this endpoint is executed.
    return current_user


