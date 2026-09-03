from sqlmodel import Session, select

from backend.app.models.movie import Movie
from backend.app.models.user_movie import UserMovie


class MovieRepository:
    """
    Repository responsible for database operations related to movies
    and user movie collections.
    """

    def __init__(self, session: Session):
        """
        Initialize the repository with an active database session.

        Parameters:
        session (Session): The SQLModel database session.
        """
        self.session = session

    def get_movie_by_id(self, movie_id: int) -> Movie | None:
        """
        Retrieve a movie from the database by ID.

        Parameters:
        movie_id (int): The ID of the movie.

        Returns:
        Movie | None: The matching movie if found, otherwise None.
        """
        return self.session.get(Movie, movie_id)

    def get_movie_by_title_and_year(
        self,
        title: str,
        release_year: int,
    ) -> Movie | None:
        """
        Retrieve a movie using its title and release year.

        Parameters:
        title (str): The title of the movie.
        release_year (int): The release year of the movie.

        Returns:
        Movie | None: The matching movie if found, otherwise None.
        """
        statement = select(Movie).where(
            Movie.title == title,
            Movie.release_year == release_year,
        )

        return self.session.exec(statement).first()

    def create_movie(self, movie: Movie) -> Movie:
        """
        Store a new shared movie in the database.

        Parameters:
        movie (Movie): The movie object to be stored.

        Returns:
        Movie: The newly created movie.
        """
        self.session.add(movie)
        self.session.commit()
        self.session.refresh(movie)

        return movie

    def get_user_movie(
        self,
        user_id: int,
        movie_id: int,
    ) -> UserMovie | None:
        """
        Retrieve the relation between a user and a movie.

        Parameters:
        user_id (int): The ID of the user.
        movie_id (int): The ID of the movie.

        Returns:
        UserMovie | None: The matching user-movie relation if found,
                          otherwise None.
        """
        statement = select(UserMovie).where(
            UserMovie.user_id == user_id,
            UserMovie.movie_id == movie_id,
        )

        return self.session.exec(statement).first()

    def create_user_movie(
        self,
        user_movie: UserMovie,
    ) -> UserMovie:
        """
        Add a movie to a user's personal collection.

        Parameters:
        user_movie (UserMovie): The relation between the user and movie.

        Returns:
        UserMovie: The newly created user-movie relation.
        """
        self.session.add(user_movie)
        self.session.commit()
        self.session.refresh(user_movie)

        return user_movie

    def get_movies_by_user(
        self,
        user_id: int,
    ) -> list[tuple[Movie, UserMovie]]:
        """
        Retrieve all movies that belong to a user's collection.

        Parameters:
        user_id (int): The ID of the user.

        Returns:
        list[tuple[Movie, UserMovie]]: A list containing the shared movie
                                      data together with the user's
                                      personal movie information.
        """
        # Join Movie with UserMovie to combine shared movie data
        # with the user's personal status and rating.
        statement = (
            select(Movie, UserMovie)
            .join(
                UserMovie,
                UserMovie.movie_id == Movie.id,
            )
            .where(UserMovie.user_id == user_id)
        )

        results = self.session.exec(statement).all()

        return list(results)

    def update_user_movie(
        self,
        user_movie: UserMovie,
    ) -> UserMovie:
        """
        Update a movie entry in a user's personal collection.

        Parameters:
        user_movie (UserMovie): The updated user-movie relation.

        Returns:
        UserMovie: The updated relation after it is saved.
        """
        self.session.add(user_movie)
        self.session.commit()
        self.session.refresh(user_movie)

        return user_movie

    def delete_user_movie(
        self,
        user_movie: UserMovie,
    ) -> None:
        """
        Remove a movie from a user's personal collection.

        Parameters:
        user_movie (UserMovie): The user-movie relation to delete.

        Returns:
        None
        """
        self.session.delete(user_movie)
        self.session.commit()






































        