from sqlmodel import Session, select

from backend.app.models.user import User


class UserRepository:
    """
    Repository responsible for database operations related to users.
    """

    def __init__(self, session: Session):
        """
        Initialize the repository with an active database session.

        Parameters:
        session (Session): The SQLModel database session.
        """
        self.session = session

    def get_user_by_id(self, user_id: int) -> User | None:
        """
        Retrieve a user from the database by ID.

        Parameters:
        user_id (int): The ID of the user.

        Returns:
        User | None: The matching user if found, otherwise None.
        """
        return self.session.get(User, user_id)

    def get_user_by_email(self, email: str) -> User | None:
        """
        Retrieve a user from the database by email address.

        Parameters:
        email (str): The email address of the user.

        Returns:
        User | None: The matching user if found, otherwise None.
        """
        statement = select(User).where(User.email == email)
        result = self.session.exec(statement).first()

        return result

    def get_user_by_username(self, username: str) -> User | None:
        """
        Retrieve a user from the database by username.

        Parameters:
        username (str): The username to search for.

        Returns:
        User | None: The matching user if found, otherwise None.
        """
        statement = select(User).where(User.username == username)
        result = self.session.exec(statement).first()

        return result

    def create(self, user: User) -> User:
        """
        Save a new user in the database.

        Parameters:
        user (User): The user object to be stored.

        Returns:
        User: The newly created user with its generated database ID.
        """
        # Add the new user and save the transaction in the database.
        self.session.add(user)
        self.session.commit()

        # Refresh the object to retrieve database-generated values such as the ID.
        self.session.refresh(user)

        return user

    














    