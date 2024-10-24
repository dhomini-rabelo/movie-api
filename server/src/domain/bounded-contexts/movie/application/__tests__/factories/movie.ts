import { Factory } from '@tests/types/factory'
import { some } from '@tests/utils/some'

import { Movie, MovieProps } from '../../../enterprise/entities/movie'
import { MovieDirectorWatchedList } from '../../../enterprise/entities/watched-lists/movie-director'
import { MovieRepository } from '../../repositories/movie'

export function createMovieData({
  name = some.text(),
}: Partial<MovieProps> = {}): MovieProps {
  return {
    name,
    directors: new MovieDirectorWatchedList(),
  }
}

export class MovieFactory implements Factory<Movie> {
  constructor(private movieRepository: MovieRepository) {}

  async create(data: Partial<MovieProps> = {}) {
    return this.movieRepository.create(createMovieData(data))
  }
}
