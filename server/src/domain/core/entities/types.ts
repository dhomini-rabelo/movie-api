import { ID } from './id'

export type WithID<Props> = Props & {
  id: ID
}
