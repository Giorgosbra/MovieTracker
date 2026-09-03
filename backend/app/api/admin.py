from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)
from sqlmodel import Session

from backend.app.api.dependencies import (
    get_current_admin,
)
from backend.app.database.database import (
    get_session,
)
from backend.app.models.user import User
from backend.app.schemas.admin import (
    AdminUserStats,
)
from backend.app.schemas.user import (
    UserRead,
)
from backend.app.services.admin_service import (
    AdminService,
)


# Router responsible for administrator-only endpoints.
router = APIRouter(
    prefix='/admin',
    tags=['Admin'],
)


@router.get(
    '/users',
    response_model=list[UserRead],
)
def get_users(
    session: Session = Depends(
        get_session,
    ),
    current_admin: User = Depends(
        get_current_admin,
    ),
):
    """
    Retrieve all registered users.

    Parameters:
    session (Session): The active database session.
    current_admin (User): The authenticated administrator.

    Returns:
    list[UserRead]: A list containing all registered users.
    """
    # get_current_admin ensures that only administrators
    # are allowed to access this endpoint.
    service = AdminService(
        session,
    )

    return service.get_users()


@router.get(
    '/users/{user_id}/stats',
    response_model=AdminUserStats,
)
def get_user_stats(
    user_id: int,
    session: Session = Depends(
        get_session,
    ),
    current_admin: User = Depends(
        get_current_admin,
    ),
):
    """
    Retrieve movie statistics for a specific user.

    Parameters:
    user_id (int): The ID of the requested user.
    session (Session): The active database session.
    current_admin (User): The authenticated administrator.

    Returns:
    AdminUserStats: The movie activity statistics of the requested user.

    Raises:
    HTTPException: If the requested user does not exist.
    """
    service = AdminService(
        session,
    )

    try:
        return (
            service.get_user_stats(
                user_id,
            )
        )

    except ValueError as error:
        # Return 404 when the requested user cannot be found.
        raise HTTPException(
            status_code=
                status.HTTP_404_NOT_FOUND,
            detail=str(error),
        )


@router.delete(
    '/users/{user_id}',
    status_code=
        status.HTTP_204_NO_CONTENT,
)
def delete_user(
    user_id: int,
    session: Session = Depends(
        get_session,
    ),
    current_admin: User = Depends(
        get_current_admin,
    ),
):
    """
    Delete a user account.

    Parameters:
    user_id (int): The ID of the user to delete.
    session (Session): The active database session.
    current_admin (User): The administrator performing the deletion.

    Returns:
    None

    Raises:
    HTTPException: If the requested user does not exist or the
                   administrator attempts to delete their own account.
    """
    service = AdminService(
        session,
    )

    try:
        # Pass the current administrator so the service can
        # prevent administrator self-deletion.
        service.delete_user(
            user_id,
            current_admin,
        )

    except ValueError as error:
        if (
            str(error)
            == 'User not found'
        ):
            # Return 404 when the requested user does not exist.
            raise HTTPException(
                status_code=
                    status.HTTP_404_NOT_FOUND,
                detail=str(error),
            )

        # Other business-rule errors are returned as bad requests.
        raise HTTPException(
            status_code=
                status.HTTP_400_BAD_REQUEST,
            detail=str(error),
        )

    return None















