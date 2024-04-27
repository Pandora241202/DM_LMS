import { Module } from '@nestjs/common';
import { CourseService } from './courses.service';
import { CourseController } from './courses.controller';
import { PrismaModule } from 'src/services/prisma/prisma.module';
import { LessonModule } from '../lessons/lessons.module';

@Module({
  imports: [PrismaModule, LessonModule],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}
