import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { LearningPathCreateREQ } from './request/learning-path-create.request';
import { LearningMaterialRESP } from '../learning-material/response/learning-material.response';

@Injectable()
export class LearningPathService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userID: number, body: LearningPathCreateREQ) {
    const learner = await this.prismaService.learner.findFirstOrThrow({ where: { userId: userID }, select: { id: true } });

    body.lmIds.map(
      async (path, index) =>
        await this.prismaService.learningPath.create({ data: LearningPathCreateREQ.toCreateInput(learner.id, path, index) }),
    );
  }

  async detail(learnerId: number) {
    const paths = await this.prismaService.learningPath.findMany({
      where: { learnerId: learnerId },
      select: {
        learningMaterialOrder: true,
        learningMaterialId: true,
      },
    });
    if (paths.length === 0) throw new NotFoundException();
    const lmIds = paths.sort((a, b) => a.learningMaterialOrder - b.learningMaterialOrder).map((p) => p.learningMaterialId);

    const lms = await this.prismaService.learningMaterial.findMany({
      where: { id: { in: lmIds } },
      select: {
        id: true,
        name: true,
        difficulty: true,
        type: true,
        rating: true,
        score: true,
        time: true,
        Topic: true,
      },
    });

    return lms.map((lm) => LearningMaterialRESP.fromEntity(lm));
  }
}
