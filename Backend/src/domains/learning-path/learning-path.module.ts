import { PrismaModule } from 'src/service/prisma/prisma.module';
import { LearningPathConttroller } from './learning-path.controller';
import { LearningPathService } from './learning-path.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule],
  controllers: [LearningPathConttroller],
  providers: [LearningPathService],
})
export class LearningPathModule {}
