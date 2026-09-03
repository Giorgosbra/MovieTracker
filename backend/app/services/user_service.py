from sqlmodel import Session

from backend.app.core.security import (
    hash_password,
    verify_password,
    create_access_token
)

from backend.app.models.user import User
from backend.app.repositories.user_repository import UserRepository
from backend.app.schemas.user import UserCreate
from backend.app.schemas.auth import LoginRequest


class UserService:
    """
    Service responsible for user registration and authentication logic.
    """

    def __init__(self, session: Session):
        """
        Initialize the service with a user repository.

        Parameters:
        session (Session): The active SQLModel database session.
        """
        self.repository = UserRepository(session)

    def register(self, user_data: UserCreate) -> User:
        """
        Register a new user in the application.

        Parameters:
        user_data (UserCreate): The validated registration data.

        Returns:
        User: The newly created user.

        Raises:
        ValueError: If the email is already registered or the username
                    is already taken.
        """
        # Check whether another user already uses the same email.
        existing_email = self.repository.get_user_by_email(
            user_data.email
        )

        if existing_email:
            raise ValueError("Email is already registered")

        # Check whether another user already uses the same username.
        existing_username = self.repository.get_user_by_username(
            user_data.username
        )

        if existing_username:
            raise ValueError("Username is already taken")

        # Hash the password before creating the database user object.
        user = User(
            username=user_data.username,
            email=user_data.email,
            password_hash=hash_password(user_data.password),
            role="user"
        )

        # New registrations always receive the regular user role.
        return self.repository.create(user)

    def login(self, login_data: LoginRequest) -> str:
        """
        Authenticate a user and create a JWT access token.

        Parameters:
        login_data (LoginRequest): The email and password submitted
                                   by the user.

        Returns:
        str: A JWT access token for the authenticated user.

        Raises:
        ValueError: If the email or password is invalid, or the user
                    does not have a valid database ID.
        """
        # Find the user account using the submitted email address.
        user = self.repository.get_user_by_email(
            login_data.email
        )

        if not user:
            raise ValueError("Invalid email or password")

        # Compare the submitted password with the stored password hash.
        password_is_valid = verify_password(
            login_data.password,
            user.password_hash
        )

        if not password_is_valid:
            raise ValueError("Invalid email or password")

        if user.id is None:
            raise ValueError("Invalid user")

        # Create a JWT token containing the authenticated user's ID.
        return create_access_token(user.id)
    




















    