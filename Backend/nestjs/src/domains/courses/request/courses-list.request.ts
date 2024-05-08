import { ParseBoolPipe } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { leanObject } from 'src/shared/prisma.helper';

export class CourseListREQ {
  @IsOptional()
  @IsString()
  name: string;

  static toCondition(query: CourseListREQ): Prisma.CourseFindManyArgs["where"] {
    return leanObject({
      visibility: true,
      name: {
        contains: query.name
      }
    })
  }
}

export class CourseOwnListREQ{
  @IsOptional()
  @IsNumber()
  userId: number;

  @IsOptional()
  @IsBoolean()
  visibility: boolean;

  @IsOptional()
  @IsString()
  name: string;

  static toCondition(query: CourseOwnListREQ): Prisma.CourseFindManyArgs["where"] {
    return leanObject({
      idInstructor: query.userId,
      visibility: query.visibility,
      name: {
        contains: query.name
      }
    })
  }
}
