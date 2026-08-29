import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'

import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import MoviesPage from './pages/MoviesPage'
import DiscoverMoviesPage from './pages/DiscoverMoviesPage'
import ProfilePage from './pages/ProfilePage'
import AdminPage from './pages/AdminPage'


function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={
          <Navigate
            to="/login"
            replace
          />
        }
      />


      <Route
        path="/login"
        element={<LoginPage />}
      />


      <Route
        path="/register"
        element={<RegisterPage />}
      />


      <Route
        path="/movies"
        element={
          <ProtectedRoute>
            <MoviesPage />
          </ProtectedRoute>
        }
      />


      <Route
        path="/discover"
        element={
          <ProtectedRoute>
            <DiscoverMoviesPage />
          </ProtectedRoute>
        }
      />


      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />


      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          </ProtectedRoute>
        }
      />


      <Route
        path="*"
        element={
          <Navigate
            to="/login"
            replace
          />
        }
      />

    </Routes>
  )
}


export default App























