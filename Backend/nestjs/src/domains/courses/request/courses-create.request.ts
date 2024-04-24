import { BackgroundKnowledgeType, Prisma } from '@prisma/client';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class CourseCreateREQ {
  @IsString()
  name: string;

  @IsNumber()
  idInstructor: number;

  @IsOptional()
  @IsBoolean()
  visibility: boolean = false;

  @IsEnum(BackgroundKnowledgeType)
  level: BackgroundKnowledgeType;

  @IsString()
  description: string;

  @IsNumber()
  amountOfTime: number;

  static toCreateInput(body: CourseCreateREQ): Prisma.CourseCreateInput {
    return {
      idInstructor: body.idInstructor,
      name: body.name,
      visibility: body.visibility,
      level: body.level,
      description: body.description,
      amountOfTime: body.amountOfTime,
    };
  }
}
