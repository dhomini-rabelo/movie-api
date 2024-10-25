import { UseCase } from '@/domain/core/use-cases/base'

import { DirectorProps } from '../../../enterprise/entities/director'
import { DirectorRepository } from '../../repositories/director'

type Payload = DirectorProps

export class CreateDirectorUseCase implements UseCase {
  constructor(private readonly directorRepository: DirectorRepository) {}

  async execute(payload: Payload) {
    return this.directorRepository.create({
      ...payload,
    })
  }
}
