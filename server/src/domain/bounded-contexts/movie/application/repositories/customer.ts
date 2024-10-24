import { Repository } from '@/domain/core/adapters/repository'

import { Customer } from '../../enterprise/entities/customer'

export type CustomerRepository = Repository<Customer>
