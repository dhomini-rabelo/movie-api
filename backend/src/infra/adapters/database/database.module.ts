import { Module } from '@nestjs/common';
import { PrismaService } from './prisma';
import { PrismaUserRepository } from './repositories/user/repository';
import { UserRepository } from '@/domain/bounded-contexts/auth/application/repositories/user';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [
    PrismaService,
    UserRepository,
  ],
})
export class DatabaseModule {}
