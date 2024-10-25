import { BadRequestException, Body, Controller, ForbiddenException, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from '@infra/http/pipes/zod';
import * as zod from 'zod';
import { UserPresenter } from '../../presenters/user';
import { UserAlreadyExistsError } from '@/domain/bounded-contexts/auth/application/use-cases/register/errors/user-already-exists';
import { RegisterUserUseCase } from '@/domain/bounded-contexts/auth/application/use-cases/register/register';
import { JwtAuthGuard } from '../../auth/jwt-guard';
import { UserSub } from '../../auth/user-sub';
import { UserTokenSchema } from '../../auth/auth.strategy';
import { ForbiddenNonAdminUser } from '@/domain/bounded-contexts/auth/application/use-cases/register/errors/forbidden-non-admin-user';

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
  ) {}

  @Post()
  async handle(
    @UserSub() userSub: UserTokenSchema,
    @Body(new ZodValidationPipe(registerUserDTO)) body: RegisterUserDTO,
  ) {
    try {
      const newUser = await this.useCase.execute({
        data: body,
        createdBy: userSub.value,
      })
  
      return UserPresenter.toHttp(newUser);
    } catch (error) {
       if (error instanceof UserAlreadyExistsError) {
        throw new BadRequestException({
          email: [
            'User already exists'
          ],
        })
      } else if (error instanceof ForbiddenNonAdminUser) {
        throw new ForbiddenException({
          message: 'You cannot register a user because you are not an admin',
        })
      }
      throw error;
    }
  }
}
