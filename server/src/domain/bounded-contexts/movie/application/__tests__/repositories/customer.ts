import { EntityWithStatic } from '@/domain/core/entities/base'
import { InMemoryRepository } from '@tests/utils/in-memory-repository'

import { Customer } from '../../../enterprise/entities/customer'
import { CustomerRepository } from '../../repositories/customer'

export class InMemoryCustomerRepository
  extends InMemoryRepository<Customer>
  implements CustomerRepository
{
  protected entity = Customer as unknown as EntityWithStatic<Customer>
}
