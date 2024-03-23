import { Body, Controller, Get, Post } from '@nestjs/common';
import { LearningMaterialService } from './learning-material.service';
import { LearningMaterialCreateREQ } from './request/learning-material.create';

@Controller('learning-material')
export class LearningMaterialController {
  constructor(private readonly learningMaterialService: LearningMaterialService) {}

  @Post()
  async create(@Body() body: LearningMaterialCreateREQ) {
    await this.learningMaterialService.create(body);
  }

  @Get()
  async detail(id: number) {
    await this.learningMaterialService.detail(id);
  }

  @Post('batch')
  async createMany(@Body() body: LearningMaterialCreateREQ[]) {
    await this.learningMaterialService.createMany(body);
  }

}
