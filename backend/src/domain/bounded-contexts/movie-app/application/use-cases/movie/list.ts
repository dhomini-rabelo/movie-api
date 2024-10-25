import { UseCase } from '@/domain/core/use-cases/base'
import { MovieRepository } from '../../repositories/movie'
import { Injectable } from '@nestjs/common'
import { createID } from '@tests/utils/domain'

interface Payload {
  name?: string
  genreId?: string
  actorId?: string
  directorId?: string
}

@Injectable()
export class ListMoviesUseCase implements UseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute(payload: Payload) {
    const movies = await this.movieRepository.findManyForListing({
      name: payload.name,
      genreId: payload.genreId ? createID(payload.genreId): undefined,
      actorId: payload.actorId ? createID(payload.actorId): undefined,
      directorId: payload.directorId ? createID(payload.directorId) : undefined,
    })
    return movies
  }
}
