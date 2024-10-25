import { Entity } from '@/domain/core/entities/base'
import { ID } from '@/domain/core/entities/id'

export interface VoteProps {
  movieId: ID
  customerId: ID
  rating: number
}

export class Vote extends Entity<VoteProps> {
  static create(props: VoteProps) {
    return new Vote(props)
  }

  static reference(id: ID, props: VoteProps) {
    return new Vote(props, id)
  }
}
