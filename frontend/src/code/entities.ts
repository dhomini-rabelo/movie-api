export interface ShortcutEntity {
  id: number
  text: string
  is_pinned: boolean
  folder: number
}

export interface FolderEntity {
  id: number
  name: string
  description: string
  user: number
  is_private: boolean
}

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
