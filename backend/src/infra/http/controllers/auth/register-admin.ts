import { BadRequestException, Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from '@infra/http/pipes/zod';
import * as zod from 'zod';
import { RegisterAdminUserUseCase } from '@/domain/bounded-contexts/auth/application/use-cases/register/register-admin';
import { UserPresenter } from '../../presenters/user';
import { UserRepository } from '@/domain/bounded-contexts/auth/application/repositories/user';
import { HashModule } from '@/adapters/hash';
import { EnvService } from '@/infra/services/env';
import { InvalidTokenError } from '@/domain/bounded-contexts/auth/application/use-cases/register/errors/invalid-token';
import { UserAlreadyExistsError } from '@/domain/bounded-contexts/auth/application/use-cases/register/errors/user-already-exists';

const registerAdminDTO = zod.object({
  data: zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
  }),
  accessToken: zod.string(),
});

type RegisterAdminDTO = {
  data: {
    email: string;
    password: string;
  };
  accessToken: string;
}

@Controller('/auth/register-admin')
export class RegisterAdminUserController {
  private readonly useCase: RegisterAdminUserUseCase;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashModule: HashModule,
    private readonly env: EnvService
  ) {
    this.useCase = new RegisterAdminUserUseCase(
      this.userRepository,
      this.hashModule,
      this.env.get('CREATE_USER_ACCESS_TOKEN'),
    );
  }

  @Post()
  @UsePipes(new ZodValidationPipe(registerAdminDTO))
  async handle(
    @Body() data: RegisterAdminDTO,
  ) {
    try {
      const newUser = await this.useCase.execute({
        ...data,
      })
  
      return UserPresenter.toHttp(newUser);
    } catch (error) {
      if (error instanceof InvalidTokenError) {
        throw new BadRequestException({
          accessToken: [
            'Invalid access token'
          ],
        })
      } else if (error instanceof UserAlreadyExistsError) {
        throw new BadRequestException({
          email: [
            'User already exists'
          ],
        })
      }
      throw error;
    }
  }
}
