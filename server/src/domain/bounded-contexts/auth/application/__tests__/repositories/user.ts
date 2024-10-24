import { EntityWithStatic } from '@/domain/core/entities/base'
import { InMemoryRepository } from '@tests/utils/in-memory-repository'

import { User } from '../../../enterprise/entities/user'
import { UserRepository } from '../../repositories/user'

export class InMemoryUserRepository
  extends InMemoryRepository<User>
  implements UserRepository
{
  protected entity = User as unknown as EntityWithStatic<User>
}
