import { UseCase } from '@/domain/core/use-cases/base'

import { DirectorProps } from '../../../enterprise/entities/director'
import { DirectorRepository } from '../../repositories/director'
import { Injectable } from '@nestjs/common'

type Payload = DirectorProps

@Injectable()
export class CreateDirectorUseCase implements UseCase {
  constructor(private readonly directorRepository: DirectorRepository) {}

  async execute(payload: Payload) {
    return this.directorRepository.create({
      ...payload,
    })
  }
}
