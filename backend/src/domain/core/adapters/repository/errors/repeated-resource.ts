import { DatabaseError } from './_base'

export class RepeatedResource extends DatabaseError {
  public readonly type = 'repeated-resource'
}
