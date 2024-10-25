import { EntityWithStatic } from '@/domain/core/entities/base'
import { InMemoryRepository } from '@tests/utils/in-memory-repository'

import { Movie } from '../../../enterprise/entities/movie'
import { MovieRepository } from '../../repositories/movie'

export class InMemoryMovieRepository
  extends InMemoryRepository<Movie>
  implements MovieRepository
{
  protected entity = Movie as unknown as EntityWithStatic<Movie>
}
