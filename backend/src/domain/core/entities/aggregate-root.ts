import { AnyRecord } from '@typings/utils'

import { Entity } from './base'

export abstract class AggregateRoot<
  Props extends AnyRecord = any,
> extends Entity<Props> {}
