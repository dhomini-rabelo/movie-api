import { WatchedList } from '@/domain/core/entities/watched-list'

import { MovieDirector } from '../movie-director'

export class MovieDirectorWatchedList extends WatchedList<MovieDirector> {
  compareItems(
    movieDirectorObjectA: MovieDirector,
    movieDirectorObjectB: MovieDirector,
  ): boolean {
    return movieDirectorObjectA.props.directorId.isEqual(
      movieDirectorObjectB.props.directorId,
    )
  }
}
