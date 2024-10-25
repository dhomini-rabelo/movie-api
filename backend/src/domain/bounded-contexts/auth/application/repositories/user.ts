import { Repository } from '@/domain/core/adapters/repository'

import { User } from '../../enterprise/entities/user'

export abstract class UserRepository extends Repository<User> { }
