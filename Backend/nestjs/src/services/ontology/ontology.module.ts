import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SystemOntology, TopicOntology } from './ontology.service';
import { OntologyController } from './ontology.controller';

@Module({
  imports: [PrismaModule],
  controllers: [OntologyController],
  providers: [SystemOntology, TopicOntology],
  exports: [SystemOntology, TopicOntology],
})
export class OntologyModule {}
