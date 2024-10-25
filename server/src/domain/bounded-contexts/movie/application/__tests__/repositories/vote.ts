import { EntityWithStatic } from '@/domain/core/entities/base'
import { InMemoryRepository } from '@tests/utils/in-memory-repository'

import { Vote } from '../../../enterprise/entities/vote'
import { VoteRepository } from '../../repositories/vote'

export class InMemoryVoteRepository
  extends InMemoryRepository<Vote>
  implements VoteRepository
{
  protected entity = Vote as unknown as EntityWithStatic<Vote>
}
