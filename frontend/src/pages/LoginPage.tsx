import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import AuthLayout from '../components/AuthLayout'
import api from '../services/api'

import type { LoginData, TokenResponse } from '../types/user'


function LoginPage() {
  const navigate = useNavigate()

  // Store the values entered in the login form.
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)


  // Validate the login form before sending a request to the backend.
  const validateForm = () => {
    const email = formData.email.trim()
    const password = formData.password

    if (!email) {
      return 'Please enter your email address.'
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailPattern.test(email)) {
      return 'Please enter a valid email address.'
    }

    if (!password) {
      return 'Please enter your password.'
    }

    return ''
  }


  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()
    setError('')

    // Stop the login process if client-side validation fails.
    const validationError = validateForm()

    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)

    try {
      // Send the user's credentials to the authentication endpoint.
      const response = await api.post<TokenResponse>(
        '/auth/login',
        {
          ...formData,
          email: formData.email.trim(),
        },
      )

      // Store the JWT so it can be attached to future API requests.
      localStorage.setItem(
        'access_token',
        response.data.access_token,
      )

      // Redirect the authenticated user to their movie collection.
      navigate('/movies')

    } catch (error) {
      // Handle validation and authentication errors returned by the API.
      if (axios.isAxiosError(error)) {
        const detail = error.response?.data?.detail

        if (typeof detail === 'string') {
          setError(detail)

        } else if (Array.isArray(detail)) {
          // FastAPI validation errors can contain multiple message objects.
          const messages = detail
            .map((item) => {
              if (
                typeof item === 'object' &&
                item !== null &&
                'msg' in item
              ) {
                const message = (item as { msg?: unknown }).msg

                return typeof message === 'string'
                  ? message
                  : null
              }

              return null
            })
            .filter(
              (message): message is string =>
                message !== null,
            )

          setError(
            messages.length > 0
              ? messages.join(' ')
              : 'Login failed',
          )

        } else {
          setError('Login failed')
        }

      } else {
        setError('Something went wrong')
      }

    } finally {
      // Re-enable the submit button after the request is completed.
      setLoading(false)
    }
  }


  return (
    <AuthLayout showShowcase>
      <div>
        <div className="mb-10">
          <h2 className="text-4xl font-bold">
            Welcome back
          </h2>

          <p className="mt-3 text-base text-slate-400">
            Sign in to continue tracking your movies.
          </p>
        </div>


        {error && (
          <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}


        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(event) => {
                setFormData({
                  ...formData,
                  email: event.target.value,
                })

                setError('')
              }}
              placeholder="you@example.com"
              autoComplete="email"
              className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-5 py-4 text-base text-white outline-none transition placeholder:text-slate-600 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
            />
          </div>


          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(event) => {
                  setFormData({
                    ...formData,
                    password: event.target.value,
                  })

                  setError('')
                }}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="w-full rounded-xl border border-slate-700 bg-slate-900/60 px-5 py-4 pr-14 text-base text-white outline-none transition placeholder:text-slate-600 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((current) => !current)
                }
                aria-label={
                  showPassword
                    ? 'Hide password'
                    : 'Show password'
                }
                title={
                  showPassword
                    ? 'Hide password'
                    : 'Show password'
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-800 hover:text-rose-400"
              >
                {showPassword ? (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M3 3l18 18" />
                    <path d="M10.6 10.6a2 2 0 002.8 2.8" />
                    <path d="M9.9 4.2A10.5 10.5 0 0112 4c5.5 0 9 5 9 5a15.7 15.7 0 01-2.1 2.7" />
                    <path d="M6.6 6.6C4.4 8 3 10 3 10s3.5 5 9 5a10.5 10.5 0 004.1-.8" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>


          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-rose-600 px-5 py-4 text-base font-semibold text-white transition hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? 'Signing in...'
              : 'Sign in'}
          </button>
        </form>


        <p className="mt-8 text-base text-slate-400">
          New to MovieTracker?{' '}

          <Link
            to="/register"
            className="font-semibold text-rose-400 transition hover:text-rose-300"
          >
            Create an account
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}


export default LoginPage