from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlmodel import Session

from backend.app.core.security import decode_access_token
from backend.app.database.database import get_session
from backend.app.models.user import User
from backend.app.repositories.user_repository import UserRepository


# HTTP Bearer authentication scheme used to read the JWT token from requests.
bearer_scheme = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    session: Session = Depends(get_session)
) -> User:
    """
    Retrieve the currently authenticated user from the JWT access token.

    Parameters:
    credentials (HTTPAuthorizationCredentials): The Bearer token credentials
                                                received from the request.
    session (Session): The active database session.

    Returns:
    User: The authenticated user.

    Raises:
    HTTPException: If the token is invalid, expired, or the user does not exist.
    """
    # Extract the JWT token from the Authorization header.
    token = credentials.credentials

    try:
        # Decode the token and retrieve the user ID stored inside it.
        user_id = decode_access_token(token)

    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"}
        )

    repository = UserRepository(session)

    # Retrieve the authenticated user from the database.
    user = repository.get_user_by_id(user_id)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
            headers={"WWW-Authenticate": "Bearer"}
        )

    return user


def get_current_admin(
    current_user: User = Depends(get_current_user),
) -> User:
    """
    Verify that the currently authenticated user has administrator privileges.

    Parameters:
    current_user (User): The authenticated user returned by get_current_user.

    Returns:
    User: The authenticated administrator.

    Raises:
    HTTPException: If the authenticated user does not have the admin role.
    """
    # Allow access only to users with the admin role.
    if current_user.role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required",
        )

    return current_user




