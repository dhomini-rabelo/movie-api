import { Repository } from '@/domain/core/adapters/repository'

import { Movie } from '../../enterprise/entities/movie'

export type MovieRepository = Repository<Movie>
