import { BackgroundKnowledgeType, GenderType, Prisma, QualificationType } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { parseEponch } from 'src/shared/date.helper';
class Learner {
  id: number;
  activeReflective: number;
  sensitiveIntuitive: number;
  visualVerbal: number;
  globalSequential: number;
  backgroundKnowledge: BackgroundKnowledgeType;
  qualification: QualificationType;
  name: string;
  age: number;
  gender: GenderType;

  static fromEntity(e: Prisma.LearnerGetPayload<{ include: { user: true } }>): Learner {
    return {
      id: e.id,
      activeReflective: e.activeReflective,
      sensitiveIntuitive: e.sensitiveIntuitive,
      visualVerbal: e.visualVerbal,
      globalSequential: e.globalSequential,
      backgroundKnowledge: e.backgroundKnowledge,
      qualification: e.qualification,
      name: e.user.name,
      age: parseEponch(Date.now()).year - parseEponch(e.user.birth).year,
      gender: e.user.gender,
    };
  }
}
export class OntologyService {
  constructor(private readonly prismaService: PrismaService) {}

  async getLearners() {
    return await this.prismaService.learner.findMany({
      select: {
        id: true,
        activeReflective: true,
        sensitiveIntuitive: true,
        visualVerbal: true,
        globalSequential: true,
        backgroundKnowledge: true,
        qualification: true,
        user: {
          select: {
            name: true,
            birth: true,
            gender: true,
          },
        },
      },
    });
  }
}
