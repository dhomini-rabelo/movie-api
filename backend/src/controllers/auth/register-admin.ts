import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { PrismaService } from 'src/adapters/database/prisma';
import { ZodValidationPipe } from 'src/pipes/zod';
import * as zod from 'zod';

const registerAdminDTO = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
});

type RegisterAdminDTO = zod.infer<typeof registerAdminDTO>;

@Controller('/auth/register-admin')
export class RegisterAdminController {
  constructor(
    private readonly prismaService: PrismaService,
  ) { }

  @Post()
  @UsePipes(new ZodValidationPipe(registerAdminDTO))
  async handle(
    @Body() data: RegisterAdminDTO,
  ) {
    return this.prismaService.user.findMany()
  }
}
