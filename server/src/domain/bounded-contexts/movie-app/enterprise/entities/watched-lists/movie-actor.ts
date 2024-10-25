import { WatchedList } from '@/domain/core/entities/watched-list'

import { MovieActor } from '../movie-actor'

export class MovieActorWatchedList extends WatchedList<MovieActor> {
  compareItems(
    movieActorObjectA: MovieActor,
    movieActorObjectB: MovieActor,
  ): boolean {
    return movieActorObjectA.props.actorId.isEqual(
      movieActorObjectB.props.actorId,
    )
  }
}
