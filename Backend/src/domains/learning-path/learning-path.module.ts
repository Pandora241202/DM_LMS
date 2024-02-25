import { LearningPathConttroller } from './learning-path.controller';
import { LearningPathService } from './learning-path.service';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaService],
  controllers: [LearningPathConttroller],
  providers: [LearningPathService],
})
export class LearningPathModule {}
