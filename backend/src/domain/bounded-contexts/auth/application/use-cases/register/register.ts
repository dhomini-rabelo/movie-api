import { HashModule } from '@/adapters/hash'
import { UseCase } from '@/domain/core/use-cases/base'

import { UserRepository } from '../../repositories/user'
import { UserAlreadyExistsError } from './errors/user-already-exists'
import { InvalidEmailError } from './errors/invalid-email'
import { Injectable } from '@nestjs/common'
import { createID } from '@tests/utils/domain'
import { ForbiddenNonAdminUser } from './errors/forbidden-non-admin-user'

interface Payload {
  data: {
    email: string
    password: string
  }
  createdBy: string
}

@Injectable()
export class RegisterUserUseCase implements UseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashModule: HashModule,
  ) {}

  async execute(payload: Payload) {
    await this.validateUserAuthorization(payload.createdBy)
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
      isAdmin: false,
      isDeleted: false,
    })
  }

  private async validateUserAuthorization(createdBy: string) {
    const createdByUser = await this.userRepository.get({ id: createID(createdBy) })
    if (!createdByUser.props.isAdmin) {
      throw new ForbiddenNonAdminUser()
    }
  }

  private validateEmailRegexp(email: string) {
    const emailRegexp = new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    const isValid = emailRegexp.test(email)

    if (!isValid) {
      throw new InvalidEmailError()
    }
  }
}
