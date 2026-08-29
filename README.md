# MovieTracker

MovieTracker is a full-stack web application for managing a personal movie collection.

Users can create an account, browse a movie catalogue, add movies to their collection, mark movies as watched or add them to a watchlist, and give personal ratings.

The application also includes role-based authorization and an administration panel for managing registered users.

---

## Features

### Authentication

- User registration
- User login
- Password hashing
- JWT authentication
- Protected frontend routes
- Protected backend endpoints

### Movie Collection

Users can:

- Browse a predefined movie catalogue
- Search movies by title
- Add movies to their personal collection
- Mark movies as:
  - Watchlist
  - Watched
- Give personal ratings from 0 to 10
- Update movie status and rating
- Remove movies from their collection
- View movie details and posters

### Profile

The profile page displays:

- Username
- Email
- Account role
- Favorite genre
- Watchlist count
- Number of watched movies
- Average personal rating

### Administration

Administrators can:

- Access an admin-only dashboard
- View all registered users
- View user account details
- View user movie statistics
- Delete user accounts
- View the number of regular users and administrators

Regular users cannot access administrator endpoints or the admin page.

---

## Technologies

### Backend

- Python
- FastAPI
- SQLModel
- MySQL
- PyMySQL
- Pydantic
- Pydantic Settings
- JWT authentication
- pwdlib password hashing
- Uvicorn

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios

### Database

- MySQL

---

## Architecture

The backend follows a layered architecture:

```text
API / Controllers
        ↓
Service Layer
        ↓
Repository Layer
        ↓
SQLModel
        ↓
MySQL
```

The frontend communicates with the backend through REST API requests using Axios.

```text
React
  ↓
Axios / REST API
  ↓
FastAPI
  ↓
Service Layer
  ↓
Repository Layer
  ↓
SQLModel
  ↓
MySQL
```

Authentication is handled using JWT access tokens.

The frontend stores the access token and sends it in the `Authorization` header when accessing protected endpoints.

---

## Database Design

MovieTracker uses three main database tables:

```text
users
movies
user_movies
```

### users

Stores user account information.

Examples:

- Username
- Email
- Password hash
- Role

### movies

Stores shared movie information.

Examples:

- Title
- Description
- Release year
- Genre

### user_movies

Connects users with movies and stores personal tracking information.

Examples:

- User ID
- Movie ID
- Status
- Personal rating

This design prevents duplicate movie information when multiple users add the same movie.

For example:

```text
Movie
Interstellar

        ↓

UserMovie
User A → Watched → 9.0

UserMovie
User B → Watchlist → No rating
```

The movie exists once in the `movies` table while each user has their own tracking information.

---

## Project Structure

```text
MovieTracker/
│
├── backend/
│   └── app/
│       │
│       ├── api/
│       │   ├── auth.py
│       │   ├── users.py
│       │   ├── movies.py
│       │   ├── admin.py
│       │   └── dependencies.py
│       │
│       ├── core/
│       │   ├── config.py
│       │   └── security.py
│       │
│       ├── database/
│       │   └── database.py
│       │
│       ├── models/
│       │   ├── user.py
│       │   ├── movie.py
│       │   ├── user_movie.py
│       │   └── __init__.py
│       │
│       ├── repositories/
│       │   ├── user_repository.py
│       │   ├── movie_repository.py
│       │   └── admin_repository.py
│       │
│       ├── schemas/
│       │   ├── user.py
│       │   ├── auth.py
│       │   ├── movie.py
│       │   └── admin.py
│       │
│       ├── services/
│       │   ├── user_service.py
│       │   ├── movie_service.py
│       │   └── admin_service.py
│       │
│       └── main.py
│
├── frontend/
│   │
│   ├── public/
│   │   └── auth-posters/
│   │
│   └── src/
│       │
│       ├── components/
│       │   ├── AuthLayout.tsx
│       │   ├── ProtectedRoute.tsx
│       │   └── AdminRoute.tsx
│       │
│       ├── data/
│       │   └── movieCatalog.ts
│       │
│       ├── pages/
│       │   ├── LoginPage.tsx
│       │   ├── RegisterPage.tsx
│       │   ├── MoviesPage.tsx
│       │   ├── DiscoverMoviesPage.tsx
│       │   ├── ProfilePage.tsx
│       │   └── AdminPage.tsx
│       │
│       ├── services/
│       │   └── api.ts
│       │
│       ├── types/
│       │   ├── user.ts
│       │   └── movie.ts
│       │
│       ├── App.tsx
│       ├── main.tsx
│       └── index.css
│
├── .env.example
├── .gitignore
├── requirements.txt
└── README.md
```

---

# Installation

## 1. Clone the Repository

Clone the GitHub repository:

```bash
git clone <https://github.com/Giorgosbra/MovieTracker.git>
```

Move into the project directory:

```bash
cd MovieTracker
```

---

## 2. Create the MySQL Database

Make sure MySQL is installed and running.

Create the database:

```sql
CREATE DATABASE movietracker;
```

The application uses SQLModel to create the required tables automatically when the backend starts.

---

## 3. Backend Setup

Create a Python virtual environment.

### Windows

```bash
python -m venv .venv
```

Activate the virtual environment:

```bash
.venv\Scripts\activate
```

Install the Python dependencies:

```bash
pip install -r requirements.txt
```

---

## 4. Environment Variables

The repository contains an example environment file:

```text
.env.example
```

Create a new file in the root directory called:

```text
.env
```

Use the following structure:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=movietracker
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password

SECRET_KEY=your_secret_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

Replace the example values with your own MySQL credentials and secret key.

The `.env` file contains sensitive information and is excluded from Git through `.gitignore`.

It should never be committed to the repository.

---

## 5. Start the Backend

From the root directory of MovieTracker run:

```bash
uvicorn backend.app.main:app --reload
```

The backend will normally be available at:

```text
http://127.0.0.1:8000
```

---

## API Documentation

FastAPI automatically generates interactive API documentation using Swagger UI.

After starting the backend, open:

```text
http://127.0.0.1:8000/docs
```

The Swagger interface can be used to inspect and test the REST API endpoints.

---

## 6. Frontend Setup

Open another terminal and move into the frontend directory:

```bash
cd frontend
```

Install the frontend dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# Running the Application

During development, two terminals are required.

### Terminal 1 - Backend

Run from the MovieTracker root directory:

```bash
uvicorn backend.app.main:app --reload
```

### Terminal 2 - Frontend

Move into the frontend directory:

```bash
cd frontend
```

Then run:

```bash
npm run dev
```

Open the application in the browser:

```text
http://localhost:5173
```

---

# Authentication

Users can create accounts through the registration page.

Every newly registered account is created with the default role:

```text
user
```

Passwords are never stored as plain text.

Before being stored in MySQL, passwords are securely hashed.

After a successful login, the backend returns a JWT access token.

Protected requests use the following header:

```text
Authorization: Bearer <access_token>
```

The frontend automatically includes the token when communicating with protected backend endpoints.

---

# Administrator Setup

Public registration always creates a regular user.

For development purposes, an existing user can be promoted to administrator directly in MySQL.

Example:

```sql
UPDATE users
SET role = 'admin'
WHERE email = 'admin@example.com';
```

After logging in with that account, the user will have access to the administrator functionality.

---

# Authorization

MovieTracker uses role-based authorization.

## Regular User

A regular user can:

- Access their profile
- Browse the movie catalogue
- Search for movies
- Add movies to their personal collection
- Mark movies as watched
- Add movies to their watchlist
- Give personal ratings
- Update their own movie status and rating
- Remove movies from their own collection

A regular user cannot:

- Access administrator endpoints
- Access the admin dashboard
- View all registered users
- Delete other users

## Administrator

An administrator can additionally:

- Access the Admin Panel
- View all registered users
- View user account details
- View user movie statistics
- Delete other user accounts

An administrator cannot delete their own active administrator account.

Authorization checks are performed by the backend and do not rely only on frontend route protection.

---

# Profile Statistics

The MovieTracker profile calculates useful information based on each user's movie collection.

The profile displays:

### Favorite Genre

The genre that appears most frequently in the user's collection.

### Watchlist

The number of movies currently marked as:

```text
watchlist
```

### Movies Watched

The number of movies marked as:

```text
watched
```

### Average Rating

The average of the user's personal ratings.

Only watched movies that have a personal rating are included in the average.

---

# Admin User Statistics

Administrators can open the details of a registered user and view movie activity statistics.

The Admin Panel displays:

- Favorite genre
- Watchlist count
- Number of watched movies
- Average personal rating

These statistics are retrieved through an administrator-only backend endpoint.

---

# Validation

The backend validates incoming request data before it reaches the service and repository layers.

This prevents invalid data from being stored in the database.

## Username

Usernames must contain between:

```text
2 and 50 characters
```

## Password

Registration passwords must contain between:

```text
8 and 128 characters
```

## Email

Email addresses are validated using Pydantic's email validation.

Invalid email formats are rejected.

## Movie Rating

Movie ratings must be between:

```text
0 and 10
```

Values outside this range are rejected by the backend.

## Movie Status

Only the following movie statuses are accepted:

```text
watchlist
watched
```

Other values are rejected.

## Release Year

Movie release years must fall within the valid range configured by the backend.

Invalid request data is rejected before it is written to MySQL.

---

# REST API

The backend provides a REST API implemented with FastAPI.

## Authentication

```text
POST /auth/register
POST /auth/login
```

## Users

```text
GET /users/me
```

## Movies

```text
POST   /movies
GET    /movies
GET    /movies/{movie_id}
PATCH  /movies/{movie_id}
DELETE /movies/{movie_id}
```

## Administration

```text
GET    /admin/users
GET    /admin/users/{user_id}/stats
DELETE /admin/users/{user_id}
```

Administrator endpoints require an authenticated user with the:

```text
admin
```

role.

---

# Movie Catalogue

The Discover page uses a predefined movie catalogue stored in the React frontend.

The catalogue contains movie information such as:

- Title
- Description
- Release year
- Genre
- Poster

Movie poster images are stored locally in:

```text
frontend/public/auth-posters/
```

Users can browse the catalogue and search movies by title.

When a user adds a movie from the catalogue, its information is sent to the FastAPI backend.

If the movie does not already exist in the database, a new shared movie record is created.

The user's personal status and rating are stored separately.

---

# Movie Collection Logic

MovieTracker separates shared movie data from user-specific tracking information.

For example, two users can both add:

```text
Interstellar
```

without creating two complete copies of the movie.

The shared data is stored once in:

```text
movies
```

while each user's personal information is stored in:

```text
user_movies
```

Example:

```text
Interstellar

User A
Status: watched
Rating: 9.0

User B
Status: watchlist
Rating: none
```

This normalized design keeps shared movie information separate from personal user activity.

---

# Security

MovieTracker includes several security measures.

### Password Hashing

Passwords are hashed before being stored in the database.

Plain-text passwords are never stored.

### JWT Authentication

Authenticated users receive JWT access tokens.

Protected endpoints require a valid token.

### Protected API Endpoints

Users must be authenticated before accessing protected resources.

### Role-Based Authorization

Administrator functionality is protected by backend role checks.

### Ownership Checks

Users cannot access or modify another user's personal movie tracking records.

### Backend Validation

Invalid request data is rejected before it reaches the database.

### Environment Variables

Database credentials and JWT configuration are stored in `.env`.

### Git Security

The `.env` file is excluded from version control.

Only `.env.example` is included in the repository.

---

# Tested Scenarios

The application has been manually tested for multiple normal and edge-case scenarios.

## Authentication Tests

- Successful registration
- Invalid registration data
- Invalid email format
- Username validation
- Password validation
- Duplicate username
- Duplicate email
- Successful login
- Incorrect login credentials
- Request without authentication
- Invalid JWT token

## Authorization Tests

- Regular user accessing protected user endpoints
- Regular user attempting to access administrator endpoints
- Administrator accessing administrator endpoints
- Invalid user ID in administrator request
- Administrator attempting to delete their own account

## Movie Validation Tests

- Valid movie creation
- Invalid release year
- Valid movie status
- Invalid movie status
- Valid movie rating
- Rating below 0
- Rating above 10

## Movie Collection Tests

- Add movie to collection
- View personal collection
- View individual movie
- Change movie status
- Add personal rating
- Update personal rating
- Remove movie from collection
- Prevent duplicate user/movie relation
- Prevent access to another user's personal movie record

## Administration Tests

- View registered users
- View user details
- View user statistics
- Delete another user
- Protect admin-only endpoints
- Prevent administrator self-deletion

---

# Frontend Pages

## Login

Allows registered users to authenticate.

## Register

Allows new users to create an account.

## My Movies

Displays the logged-in user's personal movie collection.

Users can:

- View movie details
- Update status
- Update rating
- Remove movies
- Navigate to Discover

## Discover Movies

Displays the predefined movie catalogue.

Users can:

- Browse movies
- Search by title
- View movie details
- Add movies to their collection
- See which movies are already in their collection

## Profile

Displays account information and personal movie statistics.

## Admin Panel

Available only to administrators.

Administrators can:

- View registered users
- Open user details
- View user statistics
- Delete other accounts

---

# Frontend Route Protection

MovieTracker uses protected React routes.

Authenticated pages are wrapped using:

```text
ProtectedRoute
```

Administrator pages additionally use:

```text
AdminRoute
```

The frontend route protection improves the user experience by preventing unauthorized navigation.

However, actual authorization security is also enforced by FastAPI on the backend.

---

# Error Handling

The application handles common HTTP error scenarios.

Examples include:

```text
400 Bad Request
```

Used for invalid business operations, such as an administrator attempting to delete their own account.

```text
401 Unauthorized
```

Used when authentication credentials are missing or invalid.

```text
403 Forbidden
```

Used when an authenticated user does not have permission to perform an operation.

```text
404 Not Found
```

Used when a requested resource does not exist.

```text
422 Unprocessable Entity
```

Used when request data fails validation.

---

# Development Notes

The backend is started using Uvicorn:

```bash
uvicorn backend.app.main:app --reload
```

Because Uvicorn imports the FastAPI `app` object directly from:

```text
backend.app.main
```

a traditional:

```python
if __name__ == "__main__":
```

block is not required for the current application startup process.

---

# Future Improvements

Possible future improvements include:

- External movie API integration
- Larger and dynamic movie catalogue
- Advanced movie filtering
- Pagination
- Movie recommendations
- User reviews
- Favorite movies
- User profile customization
- Automated backend tests
- Automated frontend tests
- Docker support
- Database migrations with Alembic
- Additional administrator tools
- Deployment to a cloud environment

---

# Author

MovieTracker was developed as a final project for Coding Factory.

---

# License

This project was created for educational purposes.