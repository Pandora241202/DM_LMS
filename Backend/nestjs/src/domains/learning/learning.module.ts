import { Module } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { LearningService } from './learning.service';
import { LearningMaterialModule } from './learning-material/learning-material.module';
import { LearningPathModule } from './learning-path/learning-path.module';
import { LearningLogModule } from './learning-log/learning-log.module';

@Module({
  imports: [PrismaService, LearningMaterialModule, LearningPathModule, LearningLogModule],
  providers: [LearningService],
  exports: [LearningService],
})
export class LearningModule {}
