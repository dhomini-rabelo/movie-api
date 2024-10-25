import { Entity } from '@/domain/core/entities/base'
import { ID } from '@/domain/core/entities/id'

export interface GenreProps {
  name: string
}

export class Genre extends Entity<GenreProps> {
  static create(props: GenreProps) {
    return new Genre(props)
  }

  static reference(id: ID, props: GenreProps) {
    return new Genre(props, id)
  }
}
