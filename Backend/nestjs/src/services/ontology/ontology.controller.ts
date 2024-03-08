import { Body, Controller, Get, Post } from '@nestjs/common';
import { SystemOntology } from './ontology.service';
import { PrismaService } from '../prisma/prisma.service';
import { TopicCreateREQ } from 'src/domains/topic/request/topic-create.request';

@Controller('ontology')
export class OntologyController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly systemOntology: SystemOntology,
  ) {}

  @Get()
  async getOntologies() {
    return await this.systemOntology.showRDF();
  }
}
