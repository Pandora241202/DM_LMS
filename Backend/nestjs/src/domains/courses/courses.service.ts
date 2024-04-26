import { Injectable, NotFoundException } from '@nestjs/common';
import { CourseCreateREQ } from './request/courses-create.request';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CourseUpdateREQ } from './request/courses-update.request';

@Injectable()
export class CourseService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(body: CourseCreateREQ) {
    await this.prismaService.course.create({ data: CourseCreateREQ.toCreateInput(body) });
  }

  async update(id: number, body: CourseUpdateREQ) {
    const course = await this.prismaService.course.findFirst({where: {id}});
    if (!course) throw new NotFoundException("Course not found")
      
    await this.prismaService.course.update({ where: {id}, data: CourseUpdateREQ.toUpdateInput(body) });
  }
}
