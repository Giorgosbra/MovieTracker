from sqlmodel import Session, select

from backend.app.models.user import User
from backend.app.models.movie import Movie
from backend.app.models.user_movie import UserMovie


class AdminRepository:
    def __init__(self, session: Session):
        self.session = session


    def get_all_users(self):
        statement = select(User)

        return list(
            self.session.exec(statement).all()
        )


    def get_user_by_id(
        self,
        user_id: int,
    ):
        return self.session.get(
            User,
            user_id,
        )


    def get_user_movies(
        self,
        user_id: int,
    ) -> list[tuple[Movie, UserMovie]]:
        statement = (
            select(Movie, UserMovie)
            .join(
                UserMovie,
                UserMovie.movie_id == Movie.id,
            )
            .where(
                UserMovie.user_id == user_id,
            )
        )

        return list(
            self.session.exec(
                statement,
            ).all()
        )


    def delete_user_movies(
        self,
        user_id: int,
    ):
        statement = (
            select(UserMovie)
            .where(
                UserMovie.user_id == user_id,
            )
        )

        user_movies = (
            self.session.exec(
                statement,
            ).all()
        )

        for user_movie in user_movies:
            self.session.delete(
                user_movie,
            )

        self.session.flush()


    def delete_user(
        self,
        user: User,
    ):
        self.session.delete(user)
        self.session.commit()
















        