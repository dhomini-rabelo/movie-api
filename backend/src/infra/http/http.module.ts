import { Module } from '@nestjs/common';
import { RegisterAdminUserController } from '../http/controllers/auth/register-admin';
import { DatabaseModule } from '../adapters/database/database.module';
import { HashModule } from '@/adapters/hash';
import { BCryptHashModule } from '@/adapters/hash/implementations/bycript';
import { EnvService } from '../services/env';
import { RegisterUserUseCase } from '@/domain/bounded-contexts/auth/application/use-cases/register/register';
import { RegisterUserController } from './controllers/auth/register';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [
    RegisterUserController,
    RegisterAdminUserController
  ],
  providers: [
    EnvService,
    {
      provide: HashModule,
      useClass: BCryptHashModule,
    },
    RegisterUserUseCase,
  ],
})
export class HttpModule {}
