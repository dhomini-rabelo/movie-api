import { Entity } from '@/domain/core/entities/base'
import { ID } from '@/domain/core/entities/id'

export interface ActorProps {
  name: string
  avatarURL: string
}

export class Actor extends Entity<ActorProps> {
  static create(props: ActorProps) {
    return new Actor(props)
  }

  static reference(id: ID, props: ActorProps) {
    return new Actor(props, id)
  }
}
