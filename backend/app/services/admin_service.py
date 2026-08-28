from sqlmodel import Session

from backend.app.models.user import User
from backend.app.repositories.admin_repository import AdminRepository


class AdminService:
    def __init__(self, session: Session):
        self.repository = AdminRepository(session)

    def get_users(self) -> list[User]:
        return self.repository.get_all_users()

    def delete_user(
        self,
        user_id: int,
        current_admin: User,
    ) -> None:
        if current_admin.id == user_id:
            raise ValueError(
                "You cannot delete your own admin account"
            )

        user = self.repository.get_user_by_id(user_id)

        if not user:
            raise ValueError("User not found")

        self.repository.delete_user_movies(user_id)
        self.repository.delete_user(user)
















        