from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session

from backend.app.api.dependencies import get_current_admin
from backend.app.database.database import get_session
from backend.app.models.user import User
from backend.app.schemas.user import UserRead
from backend.app.services.admin_service import AdminService


router = APIRouter(
    prefix="/admin",
    tags=["Admin"],
)


@router.get(
    "/users",
    response_model=list[UserRead],
)
def get_users(
    session: Session = Depends(get_session),
    current_admin: User = Depends(get_current_admin),
):
    service = AdminService(session)

    return service.get_users()


@router.delete(
    "/users/{user_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_user(
    user_id: int,
    session: Session = Depends(get_session),
    current_admin: User = Depends(get_current_admin),
):
    service = AdminService(session)

    try:
        service.delete_user(
            user_id,
            current_admin,
        )
    except ValueError as error:
        message = str(error)

        if message == "User not found":
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=message,
            )

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=message,
        )
    

















    