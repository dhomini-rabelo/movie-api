import { Factory } from '@tests/types/factory'
import { createID } from '@tests/utils/domain'
import { some } from '@tests/utils/some'

import { Vote, VoteProps } from '../../../enterprise/entities/vote'
import { VoteRepository } from '../../repositories/vote'

export function createVoteData({
  customerId = createID(),
  movieId = createID(),
  rating = some.integer(0, 4),
}: Partial<VoteProps> = {}): VoteProps {
  return {
    customerId,
    movieId,
    rating,
  }
}

export class VoteFactory implements Factory<Vote> {
  constructor(private voteRepository: VoteRepository) {}

  async create(data: Partial<VoteProps> = {}) {
    return this.voteRepository.create(createVoteData(data))
  }

  async createMany(data: Partial<VoteProps>[] = []) {
    return Promise.all(data.map((vote) => this.create(vote)))
  }
}
