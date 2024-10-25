import { ID } from '@/domain/core/entities/id'
import { UseCase } from '@/domain/core/use-cases/base'
import { createID } from '@tests/utils/domain'
import { OverWrite } from '@typings/utils'

import { Actor } from '../../../enterprise/entities/actor'
import { Director } from '../../../enterprise/entities/director'
import { Genre } from '../../../enterprise/entities/genre'
import { MovieProps } from '../../../enterprise/entities/movie'
import { ActorRepository } from '../../repositories/actor'
import { DirectorRepository } from '../../repositories/director'
import { GenreRepository } from '../../repositories/genre'
import { MovieRepository } from '../../repositories/movie'
import { VoteRepository } from '../../repositories/vote'
import { Injectable } from '@nestjs/common'

interface Payload {
  id: string
}

type Response = OverWrite<
  MovieProps,
  {
    id: string
    directors: Director[]
    genres: Genre[]
    actors: Actor[]
    rating: number
  }
>

@Injectable()
export class GetMovieDetailsUseCase implements UseCase {
  constructor(
    private readonly directorRepository: DirectorRepository,
    private readonly voteRepository: VoteRepository,
    private readonly genreRepository: GenreRepository,
    private readonly actorRepository: ActorRepository,
    private readonly movieRepository: MovieRepository,
  ) {}

  async execute(payload: Payload): Promise<Response> {
    const movie = await this.movieRepository.getMovieWithRelations(createID(payload.id))
    const rating = await this.voteRepository.getAverageRating(movie.id)

    const [directors, genres, actors] = await Promise.all([
      Promise.all(
        movie.props.directors
          .getItems()
          .map((movieDirector) =>
            this.directorRepository.get({ id: movieDirector.props.directorId }),
          ),
      ),
      Promise.all(
        movie.props.genres
          .getItems()
          .map((movieGenre) =>
            this.genreRepository.get({ id: movieGenre.props.genreId }),
          ),
      ),
      Promise.all(
        movie.props.actors
          .getItems()
          .map((movieActor) =>
            this.actorRepository.get({ id: movieActor.props.actorId }),
          ),
      ),
    ])

    return {
      ...movie.props,
      id: movie.id.toString(),
      rating,
      directors,
      genres,
      actors,
    }
  }
}
