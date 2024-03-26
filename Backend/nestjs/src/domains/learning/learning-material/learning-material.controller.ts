import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { LearningMaterialService } from './learning-material.service';
import { LearningMaterialCreateREQ } from './request/learning-material.create';

@Controller('learning-materials')
export class LearningMaterialController {
  constructor(private readonly learningMaterialService: LearningMaterialService) {}

  @Post()
  async create(@Body() body: LearningMaterialCreateREQ) {
    await this.learningMaterialService.create(body);
  }

  @Get()
  async list() {
    return await this.learningMaterialService.list();
  }

  @Get(':id')
  async detail(@Param('id', ParseIntPipe) id: number) {
    return await this.learningMaterialService.detail(id);
  }

  @Post('batch')
  async createMany(@Body() body: LearningMaterialCreateREQ[]) {
    await this.learningMaterialService.createMany(body);
  }
}
