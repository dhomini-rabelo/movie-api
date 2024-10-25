import { WithID } from '@/domain/core/entities/types'

import { Entity } from '../../entities/base'
import { ID } from '../../entities/id'

export abstract class Repository<EntityClass extends Entity> {
  abstract create(props: EntityClass['props']): Promise<EntityClass>

  abstract save(entity: EntityClass): Promise<EntityClass>

  abstract update(id: ID, newProps: Partial<EntityClass['props']>): Promise<EntityClass>

  abstract get(props: Partial<WithID<EntityClass['props']>>): Promise<EntityClass>

  abstract findUnique(
    props: Partial<WithID<EntityClass['props']>>,
  ): Promise<EntityClass | null>

  abstract findFirst(
    props: Partial<WithID<EntityClass['props']>>,
  ): Promise<EntityClass | null>

  abstract findMany(
    props: Partial<WithID<EntityClass['props']>>,
  ): Promise<EntityClass[]>

  abstract reset(): Promise<void>
}
