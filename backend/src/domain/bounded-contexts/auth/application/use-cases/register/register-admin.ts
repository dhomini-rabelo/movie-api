import { HashModule } from '@/adapters/hash'
import { UseCase } from '@/domain/core/use-cases/base'

import { UserRepository } from '../../repositories/user'
import { InvalidTokenError } from './errors/invalid-token'
import { UserAlreadyExistsError } from './errors/user-already-exists'
import { InvalidEmailError } from './errors/invalid-email'

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

    this.validateEmailRegexp(payload.data.email)

    const userWithTheSameEmail = await this.userRepository.findUnique({
      email: payload.data.email,
    })

    if (userWithTheSameEmail) {
      throw new UserAlreadyExistsError()
    }

    return this.userRepository.create({
      ...payload.data,
      password: this.hashModule.generate(payload.data.password),
      isAdmin: true,
    })
  }

  private validateEmailRegexp(email: string) {
    const emailRegexp = new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    const isValid = emailRegexp.test(email)

    if (!isValid) {
      throw new InvalidEmailError()
    }
  }
}
