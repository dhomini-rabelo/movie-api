import { UseCase } from '@/domain/core/use-cases/base'
import { createID } from '@tests/utils/domain'

import { Movie } from '../../../enterprise/entities/movie'
import { MovieDirector } from '../../../enterprise/entities/movie-director'
import { MovieDirectorWatchedList } from '../../../enterprise/entities/watched-lists/movie-director'
import { MovieRepository } from '../../repositories/movie'

interface Payload {
  name: string
  directorsId: string[]
}

export class CreateMovieUseCase implements UseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute(payload: Payload) {
    const movie = Movie.create({
      name: payload.name,
    })

    const movieDirectors = payload.directorsId.map((directorId) => {
      return MovieDirector.create({
        movieId: movie.id,
        directorId: createID(directorId),
      })
    })

    movie.props.directors = new MovieDirectorWatchedList(movieDirectors)

    return this.movieRepository.save(movie)
  }
}
