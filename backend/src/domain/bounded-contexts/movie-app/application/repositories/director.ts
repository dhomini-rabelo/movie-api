import { Repository } from '@/domain/core/adapters/repository'

import { Director } from '../../enterprise/entities/director'

export abstract class DirectorRepository extends Repository<Director> {
}
