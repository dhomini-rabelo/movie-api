import { Repository } from '@/domain/core/adapters/repository'

import { Actor } from '../../enterprise/entities/actor'

export abstract class ActorRepository extends Repository<Actor> {}
