import { EntityWithStatic } from '@/domain/core/entities/base'
import { ID } from '@/domain/core/entities/id'
import { InMemoryRepository } from '@tests/utils/in-memory-repository'

import { Vote } from '../../../enterprise/entities/vote'
import { VoteRepository } from '../../repositories/vote'

export class InMemoryVoteRepository
  extends InMemoryRepository<Vote>
  implements VoteRepository
{
  protected entity = Vote as unknown as EntityWithStatic<Vote>

  async getAverageRating(movieId: ID): Promise<number> {
    const votes = this.items.filter((vote) =>
      vote.props.movieId.isEqual(movieId),
    )
    const totalRating = votes.reduce((acc, vote) => acc + vote.props.rating, 0)
    return parseFloat((totalRating / (votes.length || 1)).toFixed(2))
  }
}
