from sqlmodel import Session, select

from backend.app.models.user import User
from backend.app.models.user_movie import UserMovie


class AdminRepository:
    def __init__(self, session: Session):
        self.session = session

    def get_all_users(self) -> list[User]:
        statement = select(User)
        results = self.session.exec(statement)

        return list(results.all())

    def get_user_by_id(
        self,
        user_id: int,
    ) -> User | None:
        return self.session.get(User, user_id)

    def delete_user_movies(
        self,
        user_id: int,
    ) -> None:
        statement = select(UserMovie).where(
            UserMovie.user_id == user_id
        )

        user_movies = self.session.exec(statement).all()

        for user_movie in user_movies:
            self.session.delete(user_movie)

        # Execute the child deletions before deleting the user.
        self.session.flush()

    def delete_user(
        self,
        user: User,
    ) -> None:
        self.session.delete(user)
        self.session.commit()
















