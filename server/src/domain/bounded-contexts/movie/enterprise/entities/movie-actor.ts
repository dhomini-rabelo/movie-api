import { Entity } from '@/domain/core/entities/base'
import { ID } from '@/domain/core/entities/id'

export interface MovieActorProps {
  movieId: ID
  actorId: ID
}

export class MovieActor extends Entity<MovieActorProps> {
  static create(props: MovieActorProps) {
    return new MovieActor(props)
  }

  static reference(id: ID, props: MovieActorProps) {
    return new MovieActor(props, id)
  }
}
