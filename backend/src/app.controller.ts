import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './adapters/database/prisma';

@Controller()
export class AppController {
  constructor(
    private readonly prismaService: PrismaService,
  ) { }

  @Get()
  getHello() {
    return this.prismaService.user.findMany()
  }
}
