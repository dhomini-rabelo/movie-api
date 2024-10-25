import { UseCase } from '@/domain/core/use-cases/base'
import { createID } from '@tests/utils/domain'

import { UserRepository } from '../../repositories/user'
import { Injectable } from '@nestjs/common'

interface Payload {
  id: string
}

@Injectable()
export class DeactivateUserUseCase implements UseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(payload: Payload) {
    return this.userRepository.update(createID(payload.id), {
      isDeleted: true,
    })
  }
}
