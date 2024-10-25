import { Entity } from '@/domain/core/entities/base'
import { ID } from '@/domain/core/entities/id'

export interface MovieGenreProps {
  movieId: ID
  genreId: ID
}

export class MovieGenre extends Entity<MovieGenreProps> {
  static create(props: MovieGenreProps) {
    return new MovieGenre(props)
  }

  static reference(id: ID, props: MovieGenreProps) {
    return new MovieGenre(props, id)
  }
}
