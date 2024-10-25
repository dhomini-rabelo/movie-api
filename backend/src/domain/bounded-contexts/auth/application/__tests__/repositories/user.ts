import { EntityWithStatic } from '@/domain/core/entities/base'
import { InMemoryRepository } from '@tests/utils/in-memory-repository'

import { User, UserProps } from '../../../enterprise/entities/user'
import { UserRepository } from '../../repositories/user'
import { WithID } from '@/domain/core/entities/types'

export class InMemoryUserRepository
  extends InMemoryRepository<User>
  implements UserRepository
{
  protected entity = User as unknown as EntityWithStatic<User>
  protected defaultQueryValues: Partial<WithID<UserProps>> = {
    isDeleted: false,
  }
}
