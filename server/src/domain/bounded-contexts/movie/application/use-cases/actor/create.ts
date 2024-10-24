import { UseCase } from '@/domain/core/use-cases/base'

import { ActorProps } from '../../../enterprise/entities/actor'
import { ActorRepository } from '../../repositories/actor'

type Payload = ActorProps

export class CreateActorUseCase implements UseCase {
  constructor(private readonly actorRepository: ActorRepository) {}

  async execute(payload: Payload) {
    return this.actorRepository.create({
      ...payload,
    })
  }
}
