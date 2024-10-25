import { randomUUID } from 'node:crypto'

export class ID {
  private value: string

  toString() {
    return this.value
  }

  toValue() {
    return this.value
  }

  constructor(value?: string) {
    this.value = value ?? randomUUID()
  }

  public isEqual(id: ID) {
    return this.value === id.toValue()
  }
}
