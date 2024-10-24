import { AggregateRoot } from '@/domain/core/entities/aggregate-root'
import { ID } from '@/domain/core/entities/id'
import { Optional } from '@typings/utils'

import { MovieDirectorWatchedList } from './watched-lists/movie-director'
import { MovieGenreWatchedList } from './watched-lists/movie-genre'

export interface MovieProps {
  name: string
  directors: MovieDirectorWatchedList
  genres: MovieGenreWatchedList
}

export class Movie extends AggregateRoot<MovieProps> {
  static create(props: Optional<MovieProps, 'directors' | 'genres'>) {
    return new Movie({
      ...props,
      directors: props.directors ?? new MovieDirectorWatchedList(),
      genres: props.genres ?? new MovieGenreWatchedList(),
    })
  }

  static reference(id: ID, props: MovieProps) {
    return new Movie(props, id)
  }
}
