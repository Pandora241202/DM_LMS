import { Body, Controller, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CourseService } from './courses.service';
import { CourseCreateREQ } from './request/courses-create.request';
import { CourseUpdateREQ } from './request/courses-update.request';

@Controller('courses')
export class CourseController {
  constructor(public readonly courseService: CourseService) {}

  @Post('')
  async create(@Body() body: CourseCreateREQ) {
    await this.courseService.create(body);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: CourseUpdateREQ) {
    await this.courseService.update(id, body);
  }
}
