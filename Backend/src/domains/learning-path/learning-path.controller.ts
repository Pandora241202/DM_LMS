import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { LearningPathService } from './learning-path.service';

@Controller('/learning-paths')
export class LearningPathConttroller {
  constructor(private readonly learningPathService: LearningPathService) {}

  @Get(':id')
  async detailLearningPath(@Param('id', ParseIntPipe) id: number) {
    return this.learningPathService.detail(id);
  }
}
