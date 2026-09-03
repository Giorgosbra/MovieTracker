// Movie data returned by the backend API.
export interface Movie {
  id: number
  title: string
  description: string | null
  release_year: number
  genre: string
  status: string
  personal_rating: number | null
}


// Data sent when adding a movie to the user's collection.
export interface MovieCreate {
  title: string
  description?: string
  release_year: number
  genre: string
  status: string
  personal_rating?: number | null
}


// Fields that can be changed for an existing movie entry.
export interface MovieUpdate {
  status?: string
  personal_rating?: number | null
}