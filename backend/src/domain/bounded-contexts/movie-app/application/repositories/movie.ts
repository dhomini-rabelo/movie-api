import { Repository } from '@/domain/core/adapters/repository'

import { Movie } from '../../enterprise/entities/movie'
import { ID } from '@/domain/core/entities/id'

export abstract class MovieRepository extends Repository<Movie> {
  abstract getMovieWithRelations(movieId: ID): Promise<Movie>
  abstract findManyForListing(payload: Partial<{
    name: string
    genreId: ID
    actorId: ID
    directorId: ID
  }>): Promise<Movie[]>
}
