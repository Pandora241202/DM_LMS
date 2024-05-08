import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ModelService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.ModelUncheckedCreateInput) {
    return await this.prismaService.model.create({
      data: data,
    });
  }

  async getMany(criteria) {
    return await this.prismaService.model.findMany({
      where: criteria,
      select: {
        id: true,
        title: true,
        labels: true,
        description: true,
        updatedAt: true,
        userId: true,
        isPublic: true,
        votes: true,
        downloadCount: true,
        modelVariations: true,
        notebooks: {
          select: { notebookId: true }
        },
      },
      orderBy: {
        votes: 'desc',
      }
    });
  }

  async getOne(id: number) {
    return await this.prismaService.model.findFirst({
      where: { id: id },
      include: {
        notebooks: {
          select: {
            notebookId: true,
          }
        },
        modelVariations: {
          orderBy: [
            {framework: 'asc'},
            {slugName: 'asc'},
            {version: 'desc'},
          ]
        }
      }
    });
  }

  async updateOne(id: number, data: Prisma.ModelUncheckedUpdateInput) {
    return await this.prismaService.model.update({
      where: { id: id },
      data: data,
    });
  }
}
