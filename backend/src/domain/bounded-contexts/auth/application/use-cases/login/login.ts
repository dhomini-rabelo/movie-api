import { HashModule } from '@/adapters/hash/index'
import { JWTModule } from '@/adapters/jwt/index.'
import { UseCase } from '@/domain/core/use-cases/base'

import { UserRepository } from '../../repositories/user'
import { InvalidCredentialsError } from './errors/invalid-credentials'
import { Injectable } from '@nestjs/common'

interface Payload {
  email: string
  password: string
}

@Injectable()
export class LoginUseCase implements UseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashModule: HashModule,
    private readonly jwtModule: JWTModule,
  ) {}

  async execute(payload: Payload) {
    const user = await this.userRepository.findUnique({
      email: payload.email,
    })

    if (user && this.passwordIsCorrect(payload.password, user.props.password)) {
      return {
        accessToken: this.jwtModule.generateToken(user.id.toValue()),
        isAdmin: user.props.isAdmin,
      }
    }

    throw new InvalidCredentialsError()
  }

  private passwordIsCorrect(payloadPassword: string, userHashPassword: string) {
    return this.hashModule.compare(payloadPassword, userHashPassword)
  }
}
