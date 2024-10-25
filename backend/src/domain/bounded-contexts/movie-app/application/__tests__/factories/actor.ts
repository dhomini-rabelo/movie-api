import { Factory } from '@tests/types/factory'
import { some } from '@tests/utils/some'

import { Actor, ActorProps } from '../../../enterprise/entities/actor'
import { ActorRepository } from '../../repositories/actor'

export function createActorData({
  name = some.text(),
  avatarURL = some.text(),
}: Partial<ActorProps> = {}): ActorProps {
  return {
    name,
    avatarURL,
  }
}

export class ActorFactory implements Factory<Actor> {
  constructor(private actorRepository: ActorRepository) {}

  async create(data: Partial<ActorProps> = {}) {
    return this.actorRepository.create(createActorData(data))
  }
}
