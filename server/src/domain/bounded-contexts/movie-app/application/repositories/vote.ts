import { Repository } from '@/domain/core/adapters/repository'
import { ID } from '@/domain/core/entities/id'

import { Vote } from '../../enterprise/entities/vote'

export interface VoteRepository extends Repository<Vote> {
  getAverageRating(movieId: ID): Promise<number>
}
