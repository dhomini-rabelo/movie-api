import { UseCase } from '@/domain/core/use-cases/base'
import { createID } from '@tests/utils/domain'

import { Movie } from '../../../../enterprise/entities/movie'
import { MovieActor } from '../../../../enterprise/entities/movie-actor'
import { MovieDirector } from '../../../../enterprise/entities/movie-director'
import { MovieGenre } from '../../../../enterprise/entities/movie-genre'
import { MovieActorWatchedList } from '../../../../enterprise/entities/watched-lists/movie-actor'
import { MovieDirectorWatchedList } from '../../../../enterprise/entities/watched-lists/movie-director'
import { MovieGenreWatchedList } from '../../../../enterprise/entities/watched-lists/movie-genre'
import { MovieRepository } from '../../../repositories/movie'
import { Injectable } from '@nestjs/common'
import { CustomerRepository } from '../../../repositories/customer'
import { ForbiddenNonAdminCustomer } from './errors/forbidden-non-admin-customer'

interface Payload {
  data: {
    name: string
    year: number
    poster: string
    description: string
    totalMinutes: number
    directorsId: string[]
    genresId: string[]
    actorsId: string[]
  },
  createdBy: string
}

@Injectable()
export class CreateMovieUseCase implements UseCase {
  constructor(
    private readonly movieRepository: MovieRepository,
    private readonly customerRepository: CustomerRepository,
  ) { }

  async execute(payload: Payload) {
    await this.validateCustomerAuthorization(payload.createdBy)
    const movie = Movie.create({
      name: payload.data.name,
      year: payload.data.year,
      poster: payload.data.poster,
      description: payload.data.description,
      totalMinutes: payload.data.totalMinutes,
    })

    const movieDirectors = payload.data.directorsId.map((directorId) => {
      return MovieDirector.create({
        movieId: movie.id,
        directorId: createID(directorId),
      })
    })

    movie.props.directors = new MovieDirectorWatchedList(movieDirectors)

    const movieGenres = payload.data.genresId.map((genreId) => {
      return MovieGenre.create({
        movieId: movie.id,
        genreId: createID(genreId),
      })
    })

    movie.props.genres = new MovieGenreWatchedList(movieGenres)

    const movieActors = payload.data.actorsId.map((actorId) => {
      return MovieActor.create({
        movieId: movie.id,
        actorId: createID(actorId),
      })
    })

    movie.props.actors = new MovieActorWatchedList(movieActors)

    return this.movieRepository.save(movie)
  }

  private async validateCustomerAuthorization(createdBy: string) {
    const createdByUser = await this.customerRepository.get({ id: createID(createdBy) })
    if (!createdByUser.props.isAdmin) {
      throw new ForbiddenNonAdminCustomer()
    }
  }
}
