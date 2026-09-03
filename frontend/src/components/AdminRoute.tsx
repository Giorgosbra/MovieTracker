import { useEffect, useState } from 'react'
import {
  Navigate,
  useLocation,
} from 'react-router-dom'

import api from '../services/api'

import type { ReactNode } from 'react'
import type { User } from '../types/user'


interface AdminRouteProps {
  children: ReactNode
}


function AdminRoute({
  children,
}: AdminRouteProps) {
  const location = useLocation()

  const [checking, setChecking] =
    useState(true)

  const [isAdmin, setIsAdmin] =
    useState(false)

  const [unauthorized, setUnauthorized] =
    useState(false)


  useEffect(() => {
    // Request the authenticated user's data to verify the admin role.
    const checkAdmin = async () => {
      try {
        const response =
          await api.get<User>(
            '/users/me',
          )

        setIsAdmin(
          response.data.role === 'admin',
        )
      } catch {
        // Remove an invalid or expired token and redirect to login.
        localStorage.removeItem(
          'access_token',
        )

        setUnauthorized(true)
      } finally {
        setChecking(false)
      }
    }

    checkAdmin()
  }, [])


  // Display a temporary loading state while the role is being checked.
  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <p className="text-slate-400">
          Checking admin access...
        </p>
      </div>
    )
  }


  // Redirect users whose authentication is no longer valid.
  if (unauthorized) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    )
  }


  // Authenticated non-admin users return to the movies page.
  if (!isAdmin) {
    return (
      <Navigate
        to="/movies"
        replace
      />
    )
  }


  // Render the protected admin page only for administrator accounts.
  return children
}


export default AdminRoute







