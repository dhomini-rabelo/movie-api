import { Module } from '@nestjs/common';
import { RegisterAdminUserController } from '../http/controllers/auth/register-admin';
import { DatabaseModule } from '../adapters/database/database.module';
import { HashModule } from '@/adapters/hash';
import { BCryptHashModule } from '@/adapters/hash/implementations/bycript';
import { EnvService } from '../services/env';
import { RegisterUserUseCase } from '@/domain/bounded-contexts/auth/application/use-cases/register/register';
import { RegisterUserController } from './controllers/auth/register';
import { JWTModule } from '@/adapters/jwt/index.';
import { JsonWebTokenJWTModule } from '@/adapters/jwt/implementations/json-web-token';
import { LoginUseCase } from '@/domain/bounded-contexts/auth/application/use-cases/login/login';
import { LoginController } from './controllers/auth/login';
import { RegisterAdminUserUseCase } from '@/domain/bounded-contexts/auth/application/use-cases/register/register-admin';
import { UserRepository } from '@/domain/bounded-contexts/auth/application/repositories/user';
import { JwtStrategy } from './auth/auth.strategy';
import { UpdateUserController } from './controllers/auth/update';
import { UpdateUserUseCase } from '@/domain/bounded-contexts/auth/application/use-cases/update/update';
import { DeactivateUserController } from './controllers/auth/deactivate';
import { DeactivateUserUseCase } from '@/domain/bounded-contexts/auth/application/use-cases/deactivate/deactivate';
import { CreateDirectorController } from './controllers/movie-app/director/create';
import { CreateDirectorUseCase } from '@/domain/bounded-contexts/movie-app/application/use-cases/director/create';
import { CreateActorController } from './controllers/movie-app/actor/create';
import { CreateActorUseCase } from '@/domain/bounded-contexts/movie-app/application/use-cases/actor/create';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [
    // auth routes
    LoginController,
    RegisterUserController,
    RegisterAdminUserController,
    UpdateUserController,
    DeactivateUserController,

    // movie-app routes
    CreateDirectorController,
    CreateActorController,
  ],
  providers: [
    // services
    EnvService,
    {
      provide: HashModule,
      useClass: BCryptHashModule,
    },
    {
      provide: JWTModule,
      useFactory: (env: EnvService) => (
        new JsonWebTokenJWTModule({
          expirationTimeInMs: env.get('JWT_EXPIRATION_TIME_IN_MS'),
          secretKey: env.get('JWT_SECRET'),
        })
      ),
      inject: [EnvService],
    },


    // auth use cases
    RegisterUserUseCase,
    {
      provide: RegisterAdminUserUseCase,
      useFactory: (
        userRepository: UserRepository,
        hashModule: HashModule,
        env: EnvService
      ) => (
        new RegisterAdminUserUseCase(
          userRepository,
          hashModule,
          env.get('CREATE_USER_ADMIN_ACCESS_TOKEN'),
        )
      ),
      inject: [UserRepository, HashModule, EnvService],
    },
    LoginUseCase,
    JwtStrategy,
    UpdateUserUseCase,
    DeactivateUserUseCase,

    // movie-app use cases
    CreateDirectorUseCase,
    CreateActorUseCase,
  ],
})
export class HttpModule {}
