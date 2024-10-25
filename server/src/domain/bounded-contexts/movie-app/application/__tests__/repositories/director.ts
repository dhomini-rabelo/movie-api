import { EntityWithStatic } from '@/domain/core/entities/base'
import { InMemoryRepository } from '@tests/utils/in-memory-repository'

import { Director } from '../../../enterprise/entities/director'
import { DirectorRepository } from '../../repositories/director'

export class InMemoryDirectorRepository
  extends InMemoryRepository<Director>
  implements DirectorRepository
{
  protected entity = Director as unknown as EntityWithStatic<Director>
}
