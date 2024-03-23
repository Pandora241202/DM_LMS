import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { LearningPathCreateREQ } from './request/learning-path-create.request';

@Injectable()
export class LearningPathService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(userID: number, body: LearningPathCreateREQ) {
    await this.prismaService.learningPath.create({ data: LearningPathCreateREQ.toCreateInput(userID, body) });
  }

  async detail(id: number) {
    const learningPath = await this.prismaService.learningPath.findMany({
      where: { id },
    });

    return learningPath
  }
}
