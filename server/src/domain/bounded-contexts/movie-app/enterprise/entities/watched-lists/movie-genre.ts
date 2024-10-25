import { WatchedList } from '@/domain/core/entities/watched-list'

import { MovieGenre } from '../movie-genre'

export class MovieGenreWatchedList extends WatchedList<MovieGenre> {
  compareItems(
    movieGenreObjectA: MovieGenre,
    movieGenreObjectB: MovieGenre,
  ): boolean {
    return movieGenreObjectA.props.genreId.isEqual(
      movieGenreObjectB.props.genreId,
    )
  }
}
