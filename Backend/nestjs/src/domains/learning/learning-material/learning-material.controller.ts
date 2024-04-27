import { Body, Controller, Get, Param, ParseIntPipe, Post, Res } from '@nestjs/common';
import { LearningMaterialService } from './learning-material.service';
import { createReadStream, readFileSync } from 'fs';
import { join } from 'path';
import { Response } from 'express';
import { LearningMaterialCreateREQ } from './request/learning-material-create.request';

@Controller('learning-materials')
export class LearningMaterialController {
  constructor(private readonly learningMaterialService: LearningMaterialService) {}

  @Post('batch')
  async createMany(@Body() body: LearningMaterialCreateREQ[]) {
    await this.learningMaterialService.createMany(body);
  }

  @Post()
  async create(@Body() body: LearningMaterialCreateREQ) {
    return await this.learningMaterialService.create(body);
  }

  @Get(':id')
  async detail(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const lm = await this.learningMaterialService.detail(id);

    if (lm.type === 'OTHER') {
      const file = createReadStream(join('./uploads/materialFiles/', lm.DTO.fileName as string));
      file.pipe(res);
    } else return res.status(200).json(lm.DTO);
  }

  @Get()
  async list() {
    return await this.learningMaterialService.list();
  }
}
