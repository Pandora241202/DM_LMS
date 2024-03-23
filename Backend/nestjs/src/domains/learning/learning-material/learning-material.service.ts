import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { LearningMaterialCreateREQ } from './request/learning-material.create';

@Injectable()
export class LearningMaterialService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(body: LearningMaterialCreateREQ) {
    await this.prismaService.learningMaterial.create({ data: LearningMaterialCreateREQ.toCreateInput(body) });
  }

  async createMany(body: LearningMaterialCreateREQ[]){
    await this.prismaService.learningMaterial.createMany({ data: body.map(lm => LearningMaterialCreateREQ.toCreateInput(lm)) });
  }

  async detail(id: number) {
    const lm = await this.prismaService.learningMaterial.findUniqueOrThrow({ where: { id } });
    return lm;
  }
}
