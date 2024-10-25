import { BadRequestException, Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from '@infra/http/pipes/zod';
import * as zod from 'zod';
import { UserPresenter } from '../../presenters/user';
import { UserAlreadyExistsError } from '@/domain/bounded-contexts/auth/application/use-cases/register/errors/user-already-exists';
import { RegisterUserUseCase } from '@/domain/bounded-contexts/auth/application/use-cases/register/register';

const registerUserDTO = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
});

type RegisterUserDTO = {
  email: string;
  password: string;
}

@Controller('/auth/register')
export class RegisterUserController {
  constructor(
    private readonly useCase: RegisterUserUseCase,
  ) {
  }

  @Post()
  @UsePipes(new ZodValidationPipe(registerUserDTO))
  async handle(
    @Body() data: RegisterUserDTO,
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
