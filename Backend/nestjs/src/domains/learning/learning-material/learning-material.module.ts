import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { LearningMaterialService } from './learning-material.service';
import { LearningMaterialController } from './learning-material.controller';

@Module({
  imports: [PrismaService],
  providers: [LearningMaterialService],
  controllers: [LearningMaterialController],
})
export class LearningMaterialModule {}
