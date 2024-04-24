import { BackgroundKnowledgeType, Prisma } from '@prisma/client';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { leanObject } from 'src/shared/prisma.helper';

export class CourseUpdateREQ {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  visibility: boolean = false;

  @IsOptional()
  @IsEnum(BackgroundKnowledgeType)
  level: BackgroundKnowledgeType;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  amountOfTime: number;

  static toUpdateInput(body: CourseUpdateREQ): Prisma.CourseUpdateInput {
    return leanObject({
      name: body.name,
      visibility: body.visibility,
      level: body.level,
      description: body.description,
      amountOfTime: body.amountOfTime,
    });
  }
}
