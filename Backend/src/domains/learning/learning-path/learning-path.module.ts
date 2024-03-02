import { PrismaModule } from 'src/services/prisma/prisma.module';
import { LearningPathConttroller } from './learning-path.controller';
import { LearningPathService } from './learning-path.service';
import { Module } from '@nestjs/common';
import { OntologyModule } from 'src/services/ontology/ontology.module';

@Module({
  imports: [PrismaModule, OntologyModule],
  controllers: [LearningPathConttroller],
  providers: [LearningPathService],
})
export class LearningPathModule {}
