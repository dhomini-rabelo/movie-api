import { AggregateRoot } from '@/domain/core/entities/aggregate-root'
import { ID } from '@/domain/core/entities/id'
import { Optional } from '@typings/utils'

import { MovieDirectorWatchedList } from './watched-lists/movie-director'

export interface MovieProps {
  name: string
  directors: MovieDirectorWatchedList
}

export class Movie extends AggregateRoot<MovieProps> {
  static create(props: Optional<MovieProps, 'directors'>) {
    return new Movie({
      ...props,
      directors: props.directors ?? new MovieDirectorWatchedList(),
    })
  }

  static reference(id: ID, props: MovieProps) {
    return new Movie(props, id)
  }
}
