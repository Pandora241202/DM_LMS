import { Injectable } from '@nestjs/common';
import { LearnerLogCreateREQ } from './request/learner-log-create.request';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { LearningLogDTO } from './dto/learning-log.dto';

@Injectable()
export class LearnerLogService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userID: number, body: LearnerLogCreateREQ) {
    await this.prismaService.learnerLog.create({ data: LearnerLogCreateREQ.toCreateInput(userID, body) });
    await this.prismaService.learningPath.updateMany({
      data: { learned: true },
      where: { learningMaterialId: body.learningMaterialId, learnerId: userID },
    });

    const lm = await this.prismaService.learningMaterial.findFirst({
      where: { id: body.learningMaterialId },
      select: { rating: true },
    });
    const updateRating = (lm.rating + body.rating) / 2;
    await this.prismaService.learningMaterial.update({ where: { id: body.learningMaterialId }, data: { rating: updateRating } });
  }

  async createBatch(body: LearnerLogCreateREQ[]) {
    for (let i = 0; i < body.length; i++) {
      await this.prismaService.learnerLog.create({ data: LearnerLogCreateREQ.toCreateBatchInput(body[i]) });
      await this.prismaService.learningPath.updateMany({ data: { learned: true }, where: { learnerId: body[i].learnerId } });
    }
  }

  async detail(learnerId: number) {
    const log = await this.prismaService.learnerLog.findMany({
      where: { learnerId: learnerId },
      select: {
        learningMaterialId: true,
        learningMaterialVisittedTime: true,
        attempts: true,
        score: true,
        time: true,
        learningMaterialRating: true,
        learningMaterial: true,
      },
    });

    return log.map((l) => LearningLogDTO.fromEntity(l as any));
  }
}
