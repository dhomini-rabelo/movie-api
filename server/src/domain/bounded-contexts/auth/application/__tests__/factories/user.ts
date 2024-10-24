import { Factory } from '@tests/types/factory'
import { some } from '@tests/utils/some'

import { User, UserProps } from '../../../enterprise/entities/user'
import { UserRepository } from '../../repositories/user'

export function createUserData({
  username = some.text(),
  password = some.text(),
}: Partial<UserProps> = {}): UserProps {
  return {
    username,
    password,
  }
}

export class UserFactory implements Factory<User> {
  constructor(private userRepository: UserRepository) {}

  async create(data: Partial<UserProps> = {}) {
    return this.userRepository.create(createUserData(data))
  }
}
