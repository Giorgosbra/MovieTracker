from sqlmodel import Session

from backend.app.core.security import hash_password
from backend.app.models.user import User
from backend.app.repositories.user_repository import UserRepository
from backend.app.schemas.user import UserCreate


class UserService:

    def __init__(self, session: Session):
        self.repository = UserRepository(session)

    def register(self, user_data: UserCreate) -> User:
        existing_email = self.repository.get_by_email(user_data.email)

        if existing_email:
            raise ValueError("Email is already registered")

        existing_username = self.repository.get_by_username(user_data.username)

        if existing_username:
            raise ValueError("Username is already taken")

        user = User(
            username=user_data.username,
            email=user_data.email,
            password_hash=hash_password(user_data.password),
            role="user"
        )

        return self.repository.create(user)


    