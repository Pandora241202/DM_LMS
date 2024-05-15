import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { connectRelation } from 'src/shared/prisma.helper';

export class LearnerHistoryCourseUpdateREQ {
  @IsNotEmpty()
  @IsNumber()
  lessonId: number;

  @IsOptional()
  @IsNumber()
  lastestLessonPercentComplete: number = 0;

  static toUpdateInput(body: LearnerHistoryCourseUpdateREQ, percentComplete: number): Prisma.HistoryOfCourseUpdateInput {
    return {
      lastestLesson: connectRelation(body.lessonId),
      lastestLessonPercentComplete: body.lastestLessonPercentComplete ? body.lastestLessonPercentComplete : 0,
      percentComplete: percentComplete,
    };
  }
}
