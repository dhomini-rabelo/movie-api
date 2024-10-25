import { Module } from '@nestjs/common';
import { PrismaService } from './prisma';
import { PrismaUserRepository } from './repositories/user/repository';
import { UserRepository } from '@/domain/bounded-contexts/auth/application/repositories/user';
import { DirectorRepository } from '@/domain/bounded-contexts/movie-app/application/repositories/director';
import { PrismaDirectorRepository } from './repositories/director/repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: DirectorRepository,
      useClass: PrismaDirectorRepository,
    },
  ],
  exports: [
    PrismaService,
    UserRepository,
    DirectorRepository,
  ],
})
export class DatabaseModule {}
