export abstract class ValueObject<Props = any> {
  public readonly value: Readonly<Props>

  protected constructor(value: Props) {
    this.value = value
    Object.freeze(this)
  }
}
