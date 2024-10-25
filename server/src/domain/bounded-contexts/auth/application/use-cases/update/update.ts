import { UseCase } from '@/domain/core/use-cases/base'
import { createID } from '@tests/utils/domain'

import { UserRepository } from '../../repositories/user'

interface Payload {
  id: string
  data: {
    email: string
  }
}

export class UpdateUserUseCase implements UseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(payload: Payload) {
    return this.userRepository.update(createID(payload.id), payload.data)
  }
}
