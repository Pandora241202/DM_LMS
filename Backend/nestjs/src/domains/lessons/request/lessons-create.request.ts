import { Prisma } from '@prisma/client';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { connectRelation } from 'src/shared/prisma.helper';

export class LessonCreateREQ {
  @IsString()
  title: string;

  @IsOptional()
  @IsBoolean()
  updateCourse: boolean;

  @IsNumber()
  idCourse: number;

  @IsNumber()
  idLearningMaterial: number;

  static toCreateInput(body: LessonCreateREQ): Prisma.LessonCreateInput {
    return {
      title: body.title,
      amountOfTime: 0,
      Course: connectRelation(body.idCourse),
      LearningMaterial: connectRelation(body.idLearningMaterial),
    };
  }
}
