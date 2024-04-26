import { Body, Controller, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { LessonService } from './lessons.service';
import { LessonCreateREQ } from './request/lessons-create.request';
import { LessonUpdateREQ } from './request/lessons-update.request';

@Controller('lessons')
export class LessonController {
  constructor(public readonly lessonService: LessonService) {}

  @Post('')
  async create(@Body() body: LessonCreateREQ) {
    await this.lessonService.create(body);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: LessonUpdateREQ) {
    await this.lessonService.update(id, body);
  }
}
