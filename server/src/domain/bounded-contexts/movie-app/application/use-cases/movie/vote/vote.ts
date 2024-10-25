import { UseCase } from '@/domain/core/use-cases/base'
import { createID } from '@tests/utils/domain'

import { VoteRepository } from '../../../repositories/vote'
import { DuplicatedVoteError } from './errors/duplicated-vote'
import { InvalidRatingError } from './errors/invalid-rating'

interface Payload {
  movieId: string
  customerId: string
  rating: number
}

export class VoteUseCase implements UseCase {
  private readonly RATINGS_RANGE = [0, 1, 2, 3, 4]

  constructor(private readonly voteRepository: VoteRepository) {}

  async execute(payload: Payload) {
    await this.validateDuplicateVote(payload.customerId, payload.movieId)
    this.validateRating(payload.rating)

    return this.voteRepository.create({
      movieId: createID(payload.movieId),
      customerId: createID(payload.customerId),
      rating: payload.rating,
    })
  }

  private async validateDuplicateVote(userId: string, movieId: string) {
    const vote = await this.voteRepository.findUnique({
      customerId: createID(userId),
      movieId: createID(movieId),
    })

    if (vote) {
      throw new DuplicatedVoteError()
    }
  }

  private validateRating(rating: number) {
    if (!this.RATINGS_RANGE.includes(rating)) {
      throw new InvalidRatingError()
    }
  }
}
