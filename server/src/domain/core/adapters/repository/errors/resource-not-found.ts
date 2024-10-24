import { Entity } from '@/domain/core/entities/base'

import { DatabaseError } from './_base'

export class ResourceNotFoundError extends DatabaseError {
  public readonly type = 'resource-not-found'

  constructor(public readonly entity: Entity) {
    super()
  }
}
