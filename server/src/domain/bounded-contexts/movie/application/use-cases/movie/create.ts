import { UseCase } from '@/domain/core/use-cases/base'
import { createID } from '@tests/utils/domain'

import { Movie } from '../../../enterprise/entities/movie'
import { MovieDirector } from '../../../enterprise/entities/movie-director'
import { MovieGenre } from '../../../enterprise/entities/movie-genre'
import { MovieDirectorWatchedList } from '../../../enterprise/entities/watched-lists/movie-director'
import { MovieGenreWatchedList } from '../../../enterprise/entities/watched-lists/movie-genre'
import { MovieRepository } from '../../repositories/movie'

interface Payload {
  name: string
  directorsId: string[]
  genresId: string[]
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

    const movieGenres = payload.genresId.map((genreId) => {
      return MovieGenre.create({
        movieId: movie.id,
        genreId: createID(genreId),
      })
    })

    movie.props.genres = new MovieGenreWatchedList(movieGenres)

    return this.movieRepository.save(movie)
  }
}
