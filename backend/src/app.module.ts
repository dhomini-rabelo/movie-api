import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './adapters/database/prisma';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
