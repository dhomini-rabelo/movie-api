import { AggregateRoot } from '@/domain/core/entities/aggregate-root'
import { ID } from '@/domain/core/entities/id'
import { Optional } from '@typings/utils'

import { MovieActorWatchedList } from './watched-lists/movie-actor'
import { MovieDirectorWatchedList } from './watched-lists/movie-director'
import { MovieGenreWatchedList } from './watched-lists/movie-genre'

export interface MovieProps {
  name: string
  directors: MovieDirectorWatchedList
  genres: MovieGenreWatchedList
  actors: MovieActorWatchedList
}

export class Movie extends AggregateRoot<MovieProps> {
  static create(
    props: Optional<MovieProps, 'directors' | 'genres' | 'actors'>,
  ) {
    return new Movie({
      ...props,
      directors: props.directors ?? new MovieDirectorWatchedList(),
      genres: props.genres ?? new MovieGenreWatchedList(),
      actors: props.actors ?? new MovieActorWatchedList(),
    })
  }

  static reference(id: ID, props: MovieProps) {
    return new Movie(props, id)
  }
}
