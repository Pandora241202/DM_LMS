import { Body, Controller, Get, Param, ParseIntPipe, Post, Req } from '@nestjs/common';
import { LearningPathService } from './learning-path.service';
import { LearningPathCreateREQ } from './request/learning-path-create.request';

@Controller('learning-paths')
export class LearningPathConttroller {
  constructor(private readonly learningPathService: LearningPathService) {}

  @Post()
  async create(@Req() req: any, @Body() body: LearningPathCreateREQ) {
    await this.learningPathService.create(req.user.id, body);
  }

  @Get(':id')
  async detail(@Param('id', ParseIntPipe) id: number) {
    return await this.learningPathService.detail(id);
  }
}
