import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ZodValidationPipe } from '@infra/http/pipes/zod';
import * as zod from 'zod';
import { RegisterAdminUserUseCase } from '@/domain/bounded-contexts/auth/application/use-cases/register/register-admin';
import { UserPresenter } from '../../presenters/user';

const registerAdminDTO = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
});

type RegisterAdminDTO = Required<zod.infer<typeof registerAdminDTO>>;

@Controller('/auth/register-admin')
export class RegisterAdminUserController {
  constructor(
    private readonly useCase: RegisterAdminUserUseCase,
  ) { }

  @Post()
  @UsePipes(new ZodValidationPipe(registerAdminDTO))
  async handle(
    @Body() data: RegisterAdminDTO,
  ) {
    const newUser = await this.useCase.execute({
      data,
      accessToken: '123',
    })

    return UserPresenter.toDTO(newUser);
  }
}
