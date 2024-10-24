import { AnyRecord } from '@typings/utils'

import { ID } from './id'

export abstract class Entity<Props extends AnyRecord = any> {
  private _id: ID
  public props: Props

  get id() {
    return this._id
  }

  protected constructor(props: Props, id?: ID) {
    this.props = props
    this._id = id ?? new ID()
  }

  public getProp(propName: string) {
    return {
      ...this.props,
      id: this._id,
    }[propName]
  }

  public isEqual(entity: Entity<object>) {
    return entity === this || entity.id === this._id
  }
}

export type EntityWithStatic<EntityClass extends Entity> = EntityClass & {
  create(props: EntityClass['props']): Promise<EntityClass>
  reference(id: ID, props: EntityClass['props']): Promise<EntityClass>
}
