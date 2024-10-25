import { HashModule } from '@/adapters/hash'
import { UseCase } from '@/domain/core/use-cases/base'

import { UserRepository } from '../../repositories/user'
import { InvalidTokenError } from './errors/invalid-token'
import { UserAlreadyExistsError } from './errors/user-already-exists'

interface Payload {
  data: {
    email: string
    password: string
  }
  accessToken: string
}

export class RegisterAdminUserUseCase implements UseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashModule: HashModule,
    private readonly SECRET_ACCESS_TOKEN: string,
  ) {}

  async execute(payload: Payload) {
    if (payload.accessToken !== this.SECRET_ACCESS_TOKEN) {
      throw new InvalidTokenError()
    }

    const userWithTheSameemail = await this.userRepository.findUnique({
      email: payload.data.email,
    })

    if (userWithTheSameemail) {
      throw new UserAlreadyExistsError()
    }

    return this.userRepository.create({
      ...payload.data,
      password: this.hashModule.generate(payload.data.password),
      isAdmin: true,
    })
  }
}
