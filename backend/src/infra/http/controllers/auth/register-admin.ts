import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { PrismaService } from '@infra/adapters/database/prisma';
import { ZodValidationPipe } from '@infra/http/pipes/zod';
import * as zod from 'zod';
import { RegisterAdminUserUseCase } from '@/domain/bounded-contexts/auth/application/use-cases/register/register-admin';

const registerAdminDTO = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
});

type RegisterAdminDTO = zod.infer<typeof registerAdminDTO>;

@Controller('/auth/register-admin')
export class RegisterAdminUserController {
  constructor(
    private readonly prismaService: PrismaService,
  ) { }

  @Post()
  @UsePipes(new ZodValidationPipe(registerAdminDTO))
  async handle(
    @Body() data: RegisterAdminDTO,
  ) {
    // const useCase = new RegisterAdminUserUseCase(
      // this.prismaService.userRepository,
      // this.prismaService.hashModule,
      // process.env.SECRET_ACCESS_TOKEN,
    // );
    return { message: 'User created' };
  }
}
