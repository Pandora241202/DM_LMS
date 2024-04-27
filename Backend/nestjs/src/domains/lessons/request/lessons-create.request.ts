import { Prisma } from '@prisma/client';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { connectManyRelation, connectRelation } from 'src/shared/prisma.helper';

export class LessonCreateREQ {
  @IsString()
  title: string;

  @IsOptional()
  @IsBoolean()
  updateCourse: boolean;

  @IsNumber()
  idCourse: number;

  @IsNumber({}, { each: true })
  idLearningMaterial: number[];

  static toCreateInput(body: LessonCreateREQ): Prisma.LessonCreateInput {
    return {
      title: body.title,
      amountOfTime: 0,
      Course: connectRelation(body.idCourse),
      LearningMaterial: connectManyRelation(body.idLearningMaterial),
    };
  }
}
