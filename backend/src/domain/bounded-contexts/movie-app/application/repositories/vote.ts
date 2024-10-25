import { Repository } from '@/domain/core/adapters/repository'
import { ID } from '@/domain/core/entities/id'

import { Vote } from '../../enterprise/entities/vote'

export abstract class VoteRepository extends Repository<Vote> {
  abstract getAverageRating(movieId: ID): Promise<number>
}
