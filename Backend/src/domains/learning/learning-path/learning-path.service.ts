import { Injectable } from '@nestjs/common';
import { OntologyService } from 'src/services/ontology/ontology.service';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class LearningPathService {
  constructor(private readonly prismaService: PrismaService,
    private readonly ontoService: OntologyService) {}

  async detail(id: number) {
    const learningPath = await this.prismaService.learningPath.findMany({
      where: { id },
    });
  }
}
