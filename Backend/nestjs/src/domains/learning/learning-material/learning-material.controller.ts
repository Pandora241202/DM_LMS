import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Res } from '@nestjs/common';
import { LearningMaterialService } from './learning-material.service';
import { createReadStream, existsSync } from 'fs';
import { Response } from 'express';
import { LearningMaterialCreateREQ } from './request/learning-material-create.request';
import { FileDTO } from 'src/services/file/dto/file.dto';

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
      const filePath = `./uploads/materialFiles/${(lm.DTO as FileDTO).fileName}`;
      if (!existsSync(filePath)) throw new NotFoundException('Can not find file');
      res.set({
        'Content-Type': (lm.DTO as FileDTO).type,
        'Content-Disposition': `attachment; filename=${(lm.DTO as FileDTO).name}`,
        'filename': lm.DTO.name
      });
      createReadStream(filePath).pipe(res);
    } else return res.status(200).json(lm.DTO);
  }

  @Get()
  async list() {
    return await this.learningMaterialService.list();
  }
}
