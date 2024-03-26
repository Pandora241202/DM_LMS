import { Injectable } from '@nestjs/common';
import { LearnerLogCreateREQ } from './request/learner-log-create.request';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class LearnerLogService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userID: number, body: LearnerLogCreateREQ, tx?) {
    try {
      return tx
        ? await tx.learnerLog.create({ data: LearnerLogCreateREQ.toCreateInput(userID, body) })
        : await this.prismaService.learnerLog.create({ data: LearnerLogCreateREQ.toCreateInput(userID, body) });
    } catch (error) {
      console.error('Error creating learner log:', error);
      throw new Error('Failed to create learner log');
    }
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
}
