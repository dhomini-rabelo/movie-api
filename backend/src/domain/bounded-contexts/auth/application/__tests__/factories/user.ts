import { Factory } from '@tests/types/factory'
import { some } from '@tests/utils/some'

import { User, UserProps } from '../../../enterprise/entities/user'
import { UserRepository } from '../../repositories/user'

export function createUserData({
  email = some.email(),
  password = some.text(),
  isAdmin = some.boolean(),
}: Partial<UserProps> = {}): UserProps {
  return {
    email,
    password,
    isAdmin,
  }
}

export class UserFactory implements Factory<User> {
  constructor(private userRepository: UserRepository) {}

  async create(data: Partial<UserProps> = {}) {
    return this.userRepository.create(createUserData(data))
  }

  async createAdmin(data: Partial<UserProps> = {}) {
    return this.userRepository.create(createUserData({ ...data, isAdmin: true }))
  }
}
