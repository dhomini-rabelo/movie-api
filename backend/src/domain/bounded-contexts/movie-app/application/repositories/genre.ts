import { Repository } from '@/domain/core/adapters/repository'

import { Genre } from '../../enterprise/entities/genre'

export abstract class GenreRepository extends Repository<Genre> {}
