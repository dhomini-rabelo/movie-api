import { Entity } from '@/domain/core/entities/base'
import { ID } from '@/domain/core/entities/id'

export interface MovieDirectorProps {
  movieId: ID
  directorId: ID
}

export class MovieDirector extends Entity<MovieDirectorProps> {
  static create(props: MovieDirectorProps) {
    return new MovieDirector(props)
  }

  static reference(id: ID, props: MovieDirectorProps) {
    return new MovieDirector(props, id)
  }
}
