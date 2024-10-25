import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../adapters/database/prisma';
import { RegisterAdminController } from '../http/controllers/auth/register-admin';
import { envSchema } from './env';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
  ],
  controllers: [RegisterAdminController],
  providers: [PrismaService],
})
export class AppModule {}
