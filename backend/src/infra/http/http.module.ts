import { Module } from '@nestjs/common';
import { RegisterAdminUserController } from '../http/controllers/auth/register-admin';
import { DatabaseModule } from '../adapters/database/database.module';
import { HashModule } from '@/adapters/hash';
import { BCryptHashModule } from '@/adapters/hash/implementations/bycript';
import { EnvService } from '../services/env';

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
    EnvService,
  ],
})
export class HttpModule {}
