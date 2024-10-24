import { Repository } from '@/domain/core/adapters/repository'

import { Genre } from '../../enterprise/entities/genre'

export type GenreRepository = Repository<Genre>
