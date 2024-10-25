import { HashModule } from '@/adapters/hash'
import { UseCase } from '@/domain/core/use-cases/base'

import { UserRepository } from '../../repositories/user'
import { UserAlreadyExistsError } from './errors/user-already-exists'
import { InvalidEmailError } from './errors/invalid-email'
import { Injectable } from '@nestjs/common'

interface Payload {
  email: string
  password: string
}

@Injectable()
export class RegisterUserUseCase implements UseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashModule: HashModule,
  ) {}

  async execute(payload: Payload) {
    this.validateEmailRegexp(payload.email)
    const userWithTheSameEmail = await this.userRepository.findUnique({
      email: payload.email,
    })

    if (userWithTheSameEmail) {
      throw new UserAlreadyExistsError()
    }

    return this.userRepository.create({
      ...payload,
      password: this.hashModule.generate(payload.password),
      isAdmin: false,
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
