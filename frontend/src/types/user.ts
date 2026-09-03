export interface User {
  id: number
  username: string
  email: string
  role: string
}


// Data required to create a new user account.
export interface RegisterData {
  username: string
  email: string
  password: string
}


// Credentials required for user login.
export interface LoginData {
  email: string
  password: string
}


// JWT response returned after successful authentication.
export interface TokenResponse {
  access_token: string
  token_type: string
}