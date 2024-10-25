import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { PrismaService } from './adapters/database/prisma';
import { RegisterAdminController } from './controllers/auth/register-admin';
import { envSchema } from './core/env';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
  ],
  controllers: [AppController, RegisterAdminController],
  providers: [PrismaService],
})
export class AppModule {}
