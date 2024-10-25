import { WithID } from '@/domain/core/entities/types'

import { Entity } from '../../entities/base'
import { ID } from '../../entities/id'

export interface Repository<EntityClass extends Entity> {
  create(props: EntityClass['props']): Promise<EntityClass>

  save(entity: Entity): Promise<EntityClass>

  update(id: ID, newProps: Partial<EntityClass['props']>): Promise<EntityClass>

  get(props: Partial<WithID<EntityClass['props']>>): Promise<EntityClass>

  findUnique(
    props: Partial<WithID<EntityClass['props']>>,
  ): Promise<EntityClass | null>

  findFirst(
    props: Partial<WithID<EntityClass['props']>>,
  ): Promise<EntityClass | null>

  findMany(
    params: Partial<WithID<EntityClass['props']>>,
  ): Promise<EntityClass[]>

  reset(): Promise<void>
}
