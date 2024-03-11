import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { OntologyService } from './ontology.service';
import { OntologyController } from './ontology.controller';
import { AuthModule } from 'src/domains/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [OntologyController],
  providers: [OntologyService],
})
export class OntologyModule {}
