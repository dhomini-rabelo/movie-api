import { UserProps } from '@/domain/bounded-contexts/auth/enterprise/entities/user'
import { Entity } from '@/domain/core/entities/base'
import { ID } from '@/domain/core/entities/id'

export type CustomerProps = UserProps

export class Customer extends Entity<CustomerProps> {
  static create(props: UserProps) {
    return new Customer(props)
  }

  static reference(id: ID, props: UserProps) {
    return new Customer(props, id)
  }
}
