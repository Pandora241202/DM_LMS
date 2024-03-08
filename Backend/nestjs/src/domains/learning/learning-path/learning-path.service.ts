import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class LearningPathService {
  constructor(private readonly prismaService: PrismaService) {}

  async detail(id: number) {
    const learningPath = await this.prismaService.learningPath.findMany({
      where: { id },
    });
  }
}
