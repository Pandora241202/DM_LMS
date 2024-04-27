import { Injectable, NotFoundException } from '@nestjs/common';
import { CourseCreateREQ } from './request/courses-create.request';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { CourseUpdateREQ } from './request/courses-update.request';
import { CourseDTO, CourseListDTO } from './dto/course.dto';

@Injectable()
export class CourseService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(body: CourseCreateREQ) {
    await this.prismaService.course.create({ data: CourseCreateREQ.toCreateInput(body) });
  }

  async detail(id: number) {
    const course = await this.prismaService.course.findFirst({ where: { id }, select: CourseDTO.selectFields() });
    if (!course) throw new NotFoundException('Course not found');

    return CourseDTO.fromEnTity(course as any);
  }

  async getAll(idInstructor: number) {
    const courses = await this.prismaService.course.findMany({
      where: { idInstructor },
      select: { id: true, name: true, createdAt: true, updatedAt: true, amountOfTime: true },
    });

    return courses.map((c) => CourseListDTO.fromEntity(c as any));
  }

  async update(id: number, body: CourseUpdateREQ) {
    const course = await this.prismaService.course.findFirst({ where: { id } });
    if (!course) throw new NotFoundException('Course not found');

    await this.prismaService.course.update({ where: { id }, data: CourseUpdateREQ.toUpdateInput(body) });
  }
}
