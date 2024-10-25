import { Module } from '@nestjs/common';
import { PrismaService } from './prisma';
import { PrismaUserRepository } from './repositories/user/repository';
import { UserRepository } from '@/domain/bounded-contexts/auth/application/repositories/user';
import { DirectorRepository } from '@/domain/bounded-contexts/movie-app/application/repositories/director';
import { PrismaDirectorRepository } from './repositories/director/repository';
import { ActorRepository } from '@/domain/bounded-contexts/movie-app/application/repositories/actor';
import { PrismaActorRepository } from './repositories/actor/repository';
import { PrismaGenreRepository } from './repositories/genre/repository';
import { GenreRepository } from '@/domain/bounded-contexts/movie-app/application/repositories/genre';

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
    {
      provide: ActorRepository,
      useClass: PrismaActorRepository,
    },
    {
      provide: GenreRepository,
      useClass: PrismaGenreRepository,
    },
  ],
  exports: [
    PrismaService,
    UserRepository,
    DirectorRepository,
    ActorRepository,
    GenreRepository,
  ],
})
export class DatabaseModule {}
