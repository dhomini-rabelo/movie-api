import { Entity } from '@/domain/core/entities/base'
import { ID } from '@/domain/core/entities/id'

export interface DirectorProps {
  name: string
  avatarURL: string
}

export class Director extends Entity<DirectorProps> {
  static create(props: DirectorProps) {
    return new Director(props)
  }

  static reference(id: ID, props: DirectorProps) {
    return new Director(props, id)
  }
}
