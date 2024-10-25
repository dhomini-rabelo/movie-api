import { Repository } from '@/domain/core/adapters/repository'

import { Movie } from '../../enterprise/entities/movie'

export abstract class MovieRepository extends Repository<Movie> {
}
