import { Repository } from '@/domain/core/adapters/repository'
import { RepeatedResource } from '@/domain/core/adapters/repository/errors/repeated-resource'
import { ResourceNotFoundError } from '@/domain/core/adapters/repository/errors/resource-not-found'
import { EntityWithStatic, Entity } from '@/domain/core/entities/base'
import { ID } from '@/domain/core/entities/id'
import { WithID } from '@/domain/core/entities/types'

export abstract class InMemoryRepository<EntityClass extends Entity>
  implements Repository<EntityClass>
{
  protected items: EntityClass[] = []
  protected entity: EntityWithStatic<EntityClass>
  protected defaultQueryValues: Partial<WithID<EntityClass['props']>> = {}

  async create(props: EntityClass['props']) {
    const newItem = await this.entity.create(props)
    this.items.push(newItem)
    return newItem
  }

  async save(entity: EntityClass) {
    const itemIndex = this.items.findIndex((item) => item.id.isEqual(entity.id))
    if (itemIndex === -1) {
      this.items.push(entity)
    } else {
      this.items[itemIndex] = entity
    }
    return entity
  }

  async update(id: ID, newProps: Partial<EntityClass['props']>) {
    const item = await this.get({ id })
    item.props = {
      ...item.props,
      ...newProps,
    }
    return item
  }

  async get(
    props: Partial<WithID<EntityClass['props']>>,
  ): Promise<EntityClass> {
    const itemsFound = this.items.filter((item) => this.compare(item, {
      ...this.defaultQueryValues,
      ...props,
    }))

    if (itemsFound.length > 1) {
      throw new RepeatedResource()
    } else if (itemsFound.length === 0) {
      throw new ResourceNotFoundError(this.entity)
    }
    return itemsFound[0]
  }

  async findUnique(
    props: Partial<WithID<EntityClass['props']>>,
  ): Promise<EntityClass | null> {
    const itemsFound = this.items.filter((item) => this.compare(item, {
      ...this.defaultQueryValues,
      ...props,
    }))
    if (itemsFound.length > 1) {
      throw new RepeatedResource()
    }
    return itemsFound.length === 1 ? itemsFound[0] : null
  }

  async findFirst(
    props: Partial<WithID<EntityClass['props']>>,
  ): Promise<EntityClass | null> {
    const itemsFound = this.items.filter((item) => this.compare(item, {
      ...this.defaultQueryValues,
      ...props,
    }))
    return itemsFound.length === 1 ? itemsFound[0] : null
  }

  async findMany(props: Partial<WithID<EntityClass['props']>>) {
    return this.items.filter((item) => this.compare(item, {
      ...this.defaultQueryValues,
      ...props,
    }))
  }

  async reset() {
    this.items = []
  }

  private compare(
    item: EntityClass,
    props: Partial<WithID<EntityClass['props']>>,
  ): boolean {
    return Object.entries(props).filter(([_, value]) => value !== undefined).every(
      ([fieldName, fieldValue]: [string, any]) => {
        const prop = item.getProp(fieldName)

        
        if (prop instanceof ID && fieldValue instanceof ID) {
          return prop.isEqual(fieldValue)
        } else if (typeof prop === 'string' && typeof fieldValue === 'string') {
          return prop.includes(fieldValue)
        }

        return prop === fieldValue
      },
    )
  }
}
