import { Controller, Post } from '@nestjs/common';
import { LearningMaterialService } from './learning-material.service';
import { LearningMaterialCreateREQ } from './request/learning-material.create';

@Controller('learning-material')
export class LearningMaterialController {
  constructor(private readonly learningMaterialService: LearningMaterialService) {}

  @Post()
  async create(body: LearningMaterialCreateREQ) {
    await this.learningMaterialService.create(body);
  }
}
