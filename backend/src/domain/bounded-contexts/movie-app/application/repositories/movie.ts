import { Repository } from '@/domain/core/adapters/repository'

import { Movie } from '../../enterprise/entities/movie'
import { ID } from '@/domain/core/entities/id'

export abstract class MovieRepository extends Repository<Movie> {
  abstract getMovieWithRelations(movieId: ID): Promise<Movie>
}
