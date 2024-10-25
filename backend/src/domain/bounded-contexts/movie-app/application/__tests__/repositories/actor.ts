import { EntityWithStatic } from '@/domain/core/entities/base'
import { InMemoryRepository } from '@tests/utils/in-memory-repository'

import { Actor } from '../../../enterprise/entities/actor'
import { ActorRepository } from '../../repositories/actor'

export class InMemoryActorRepository
  extends InMemoryRepository<Actor>
  implements ActorRepository
{
  protected entity = Actor as unknown as EntityWithStatic<Actor>
}
