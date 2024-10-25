import { UseCase } from '@/domain/core/use-cases/base'

import { ActorProps } from '../../../enterprise/entities/actor'
import { ActorRepository } from '../../repositories/actor'
import { Injectable } from '@nestjs/common'

type Payload = ActorProps

@Injectable()
export class CreateActorUseCase implements UseCase {
  constructor(private readonly actorRepository: ActorRepository) {}

  async execute(payload: Payload) {
    return this.actorRepository.create({
      ...payload,
    })
  }
}
