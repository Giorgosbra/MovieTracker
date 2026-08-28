export interface Movie {
  id: number
  title: string
  description: string | null
  release_year: number
  genre: string
  status: string
  personal_rating: number | null
}

export interface MovieCreate {
  title: string
  description?: string
  release_year: number
  genre: string
  status: string
  personal_rating?: number | null
}

export interface MovieUpdate {
  status?: string
  personal_rating?: number | null
}


