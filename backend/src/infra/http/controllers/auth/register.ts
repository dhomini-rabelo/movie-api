import { BadRequestException, Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from '@infra/http/pipes/zod';
import * as zod from 'zod';
import { UserPresenter } from '../../presenters/user';
import { UserAlreadyExistsError } from '@/domain/bounded-contexts/auth/application/use-cases/register/errors/user-already-exists';
import { RegisterUserUseCase } from '@/domain/bounded-contexts/auth/application/use-cases/register/register';
import { JwtAuthGuard } from '../../auth/jwt-guard';
import { UserSub } from '../../auth/user-sub';
import { UserTokenSchema } from '../../auth/auth.strategy';

const registerUserDTO = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
});

type RegisterUserDTO = {
  email: string;
  password: string;
}

@Controller('/auth/register')
@UseGuards(JwtAuthGuard)
export class RegisterUserController {
  constructor(
    private readonly useCase: RegisterUserUseCase,
  ) {
  }

  @Post()
  async handle(
    @UserSub() userSub: UserTokenSchema,
    @Body(new ZodValidationPipe(registerUserDTO)) data: RegisterUserDTO,
  ) {
    try {
      const newUser = await this.useCase.execute({
        ...data,
      })
  
      return UserPresenter.toHttp(newUser);
    } catch (error) {
       if (error instanceof UserAlreadyExistsError) {
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
