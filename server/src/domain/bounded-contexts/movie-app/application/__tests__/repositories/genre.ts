import { EntityWithStatic } from '@/domain/core/entities/base'
import { InMemoryRepository } from '@tests/utils/in-memory-repository'

import { Genre } from '../../../enterprise/entities/genre'
import { GenreRepository } from '../../repositories/genre'

export class InMemoryGenreRepository
  extends InMemoryRepository<Genre>
  implements GenreRepository
{
  protected entity = Genre as unknown as EntityWithStatic<Genre>
}
