export interface MovieEntity {
  id: string
  name: string
  year: number
  poster: string
  description: string
  totalMinutes: number
}

export interface ActorEntity {
  id: string
  name: string
  avatarURL: string
}

export interface GenreEntity {
  id: string
  name: string
}

export interface DirectorEntity {
  id: string
  name: string
  avatarURL: string
}
