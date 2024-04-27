import { Injectable, NotFoundException } from '@nestjs/common';
import { LessonCreateREQ } from './request/lessons-create.request';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { LessonUpdateREQ } from './request/lessons-update.request';

@Injectable()
export class LessonService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(body: LessonCreateREQ) {
    const lesson = await this.prismaService.lesson.create({ data: LessonCreateREQ.toCreateInput(body), select: {id: true} });
    if (body.updateCourse) {
      await this.prismaService.course.update({where: {id: body.idCourse}, data: {updatedAt: new Date()}})
    }
    return {id: lesson.id}
  }

  async update(id: number, body: LessonUpdateREQ) {
    const lesson = await this.prismaService.lesson.findFirst({ where: { id } });
    if (!lesson) throw new NotFoundException('Lesson not found');

    await this.prismaService.lesson.update({ where: { id }, data: LessonUpdateREQ.toUpdateInput(body) });
  }
}
