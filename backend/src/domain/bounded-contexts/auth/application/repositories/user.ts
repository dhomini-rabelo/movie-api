import { Repository } from '@/domain/core/adapters/repository'

import { User } from '../../enterprise/entities/user'

export type UserRepository = Repository<User>
