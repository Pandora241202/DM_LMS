import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { LearningMaterialCreateREQ } from './request/learning-material.create';

@Injectable()
export class LearningMaterialService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(body: LearningMaterialCreateREQ) {
    await this.prismaService.learningMaterial.create({ data: LearningMaterialCreateREQ.toCreateInput(body) });
  }

  async createMany(body: LearningMaterialCreateREQ[]) {
    body.map(
      async (data) => await this.prismaService.learningMaterial.create({ data: LearningMaterialCreateREQ.toCreateInput(data) }),
    );
  }

  async detail(id: number) {
    const lm = await this.prismaService.learningMaterial.findUniqueOrThrow({ where: { id } });
    return lm;
  }

  async list(){
    const lms = await this.prismaService.learningMaterial.findMany({select: {
      id: true, name: true, time: true, type: true, topicId: true
    }})

    return lms
  }
}
