import { UseCase } from '@/domain/core/use-cases/base'

import { GenreProps } from '../../../enterprise/entities/genre'
import { GenreRepository } from '../../repositories/genre'

type Payload = GenreProps

export class CreateGenreUseCase implements UseCase {
  constructor(private readonly genreRepository: GenreRepository) {}

  async execute(payload: Payload) {
    return this.genreRepository.create({
      ...payload,
    })
  }
}
