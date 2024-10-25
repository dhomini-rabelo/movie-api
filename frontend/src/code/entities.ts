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
  id: number
  name: string
  year: number
  poster: string
  description: string
  totalMinutes: number
}
