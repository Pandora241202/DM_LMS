import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LearningPathService {
  constructor(private readonly prismaService: PrismaService) {}

  async detail(id: number) {
    return this.prismaService.learningPath.findMany({
      where: { id },
    });
  }
}
