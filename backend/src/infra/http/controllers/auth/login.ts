import { Body, Controller, ForbiddenException, HttpCode, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from '@infra/http/pipes/zod';
import * as zod from 'zod';
import { LoginUseCase } from '@/domain/bounded-contexts/auth/application/use-cases/login/login';
import { HttpStatusCode } from '@/infra/lib/http';
import { InvalidCredentialsError } from '@/domain/bounded-contexts/auth/application/use-cases/login/errors/invalid-credentials';

const loginDTO = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
});

type loginDTO = {
  email: string;
  password: string;
}

@Controller('/auth/login')
export class LoginController {
  constructor(
    private readonly useCase: LoginUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatusCode.OK)
  @UsePipes(new ZodValidationPipe(loginDTO))
  async handle(
    @Body() data: loginDTO,
  ) {
    try {
      return await this.useCase.execute({
        ...data,
      })
    } catch (error) {
       if (error instanceof InvalidCredentialsError) {
        throw new ForbiddenException({
          message: 'Invalid credentials',
        })
      }
      throw error;
    }
  }
}
