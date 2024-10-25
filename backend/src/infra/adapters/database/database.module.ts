import { Module } from '@nestjs/common';
import { PrismaService } from './prisma';
import { PrismaUserRepository } from './repositories/user/repo';

@Module({
  providers: [
    PrismaService,
    PrismaUserRepository,
  ],
  exports: [
    PrismaService,
    PrismaUserRepository,
  ],
})
export class DatabaseModule {}
