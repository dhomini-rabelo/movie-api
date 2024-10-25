import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';
import { HttpModule } from '@infra/http/http.module';
import { DatabaseModule } from '../adapters/database/database.module';
import { EnvService } from '../services/env';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    HttpModule,
    DatabaseModule,
  ],
  providers: [EnvService],
})
export class AppModule {}
