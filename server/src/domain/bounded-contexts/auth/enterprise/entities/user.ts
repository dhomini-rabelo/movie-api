import { Entity } from '@/domain/core/entities/base'
import { ID } from '@/domain/core/entities/id'

export interface UserProps {
  email: string
  password: string
  isAdmin: boolean
}

export class User extends Entity<UserProps> {
  static create(props: UserProps) {
    return new User(props)
  }

  static reference(id: ID, props: UserProps) {
    return new User(props, id)
  }
}
