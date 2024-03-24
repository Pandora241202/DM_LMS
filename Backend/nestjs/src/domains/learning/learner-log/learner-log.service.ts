import { Injectable } from '@nestjs/common';
import { LearnerLogCreateREQ } from './request/learner-log-create.request';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class LearnerLogService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userID: number, body: LearnerLogCreateREQ) {
    await this.prismaService.learnerLog.create({ data: LearnerLogCreateREQ.toCreateInput(userID, body) });
  }

  async createBatch(userID: number, body: LearnerLogCreateREQ[]){
    body.map(async data => await this.create(userID, data))
  }
}
