import { Module } from '@nestjs/common';
import { RegisterAdminUserController } from '../http/controllers/auth/register-admin';
import { RegisterAdminUserUseCase } from '@/domain/bounded-contexts/auth/application/use-cases/register/register-admin';
import { DatabaseModule } from '../adapters/database/database.module';
import { HashModule } from '@/adapters/hash';
import { BCryptHashModule } from '@/adapters/hash/implementations/bycript';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [RegisterAdminUserController],
  providers: [
    {
      provide: HashModule,
      useClass: BCryptHashModule,
    },
    RegisterAdminUserUseCase,
  ],
})
export class HttpModule {}
