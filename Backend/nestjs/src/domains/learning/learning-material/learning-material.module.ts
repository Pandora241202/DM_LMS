import { Module } from '@nestjs/common';
import { LearningMaterialService } from './learning-material.service';
import { LearningMaterialController } from './learning-material.controller';
import { PrismaModule } from 'src/services/prisma/prisma.module';
import { AuthModule } from 'src/domains/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [LearningMaterialService],
  controllers: [LearningMaterialController],
})
export class LearningMaterialModule {}
