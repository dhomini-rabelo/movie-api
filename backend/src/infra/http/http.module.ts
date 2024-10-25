import { Module } from '@nestjs/common';
import { PrismaService } from '../adapters/database/prisma';
import { RegisterAdminUserController } from '../http/controllers/auth/register-admin';

@Module({
  controllers: [RegisterAdminUserController],
  providers: [PrismaService],
})
export class HttpModule {}
