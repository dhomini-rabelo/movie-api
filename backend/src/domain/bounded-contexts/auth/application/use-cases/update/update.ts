import { UseCase } from '@/domain/core/use-cases/base'
import { createID } from '@tests/utils/domain'

import { UserRepository } from '../../repositories/user'
import { Injectable } from '@nestjs/common'

interface Payload {
  id: string
  data: {
    email: string
  }
}

@Injectable()
export class UpdateUserUseCase implements UseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(payload: Payload) {
    return this.userRepository.update(createID(payload.id), payload.data)
  }
}
