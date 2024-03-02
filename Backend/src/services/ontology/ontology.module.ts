import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { OntologyService } from './ontology.service';
import { OntologyController } from './ontology.controller';

@Module({
  imports: [PrismaModule],
  controllers: [OntologyController],
  providers: [OntologyService],
  exports: [OntologyService],
})
export class OntologyModule {}
