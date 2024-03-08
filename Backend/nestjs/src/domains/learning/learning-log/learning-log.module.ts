import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { LearningLogService } from './learning-log.service';
import { LearningLogController } from './learning-log.controller';

@Module({
  imports: [PrismaService],
  providers: [LearningLogService],
  controllers: [LearningLogController],
})
export class LearningLogModule {}
