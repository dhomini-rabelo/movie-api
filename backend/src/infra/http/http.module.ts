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

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [
    LoginController,
    RegisterUserController,
    RegisterAdminUserController
  ],
  providers: [
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
    RegisterUserUseCase,
    LoginUseCase,
  ],
})
export class HttpModule {}
