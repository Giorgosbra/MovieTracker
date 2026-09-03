import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  // Read the stored JWT access token.
  const token = localStorage.getItem('access_token')

  // Redirect unauthenticated users to the login page.
  if (!token) {
    return <Navigate to="/login" replace />
  }

  // Render the protected page when a token exists.
  return children
}

export default ProtectedRoute







