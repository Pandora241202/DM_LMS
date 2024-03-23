import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { LearningPathService } from './learning-path.service';
import { LearningPathCreateREQ } from './request/learning-path-create.request';
import { AuthGuard } from 'src/domains/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('learning-paths')
export class LearningPathConttroller {
  constructor(private readonly learningPathService: LearningPathService) {}

  @Post()
  async create(@Req() req: any, @Body() body: LearningPathCreateREQ[]) {
    await this.learningPathService.create(req.user.id, body);
  }

  @Get()
  async detail(@Req() req: any){
    return await this.learningPathService.detail(req.user.id);
  }
}
