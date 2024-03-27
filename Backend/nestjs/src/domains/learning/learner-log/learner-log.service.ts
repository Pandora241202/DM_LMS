import { Injectable } from '@nestjs/common';
import { LearnerLogCreateREQ } from './request/learner-log-create.request';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { LearningLogDTO } from './dto/learning-log.dto';

@Injectable()
export class LearnerLogService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userID: number, body: LearnerLogCreateREQ, tx?) {
    tx
      ? await tx.learnerLog.create({ data: LearnerLogCreateREQ.toCreateInput(userID, body) })
      : await this.prismaService.learnerLog.create({ data: LearnerLogCreateREQ.toCreateInput(userID, body) });
    
    tx
      ? await tx.learningPath.updateMany({data: {learned: true}, where: {learningMaterialId: body.learningMaterialId, learnerId: userID}})
      : await this.prismaService.learningPath.updateMany({data: {learned: true}, where: {learningMaterialId: body.learningMaterialId, learnerId: userID}})
  }

  async createBatch(userID: number, body: LearnerLogCreateREQ[]) {
    return this.prismaService.$transaction(async (tx) => {
      await Promise.all(
        body.map(async (data) => {
          await this.create(userID, data, tx);
        }),
      );
    });
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
