import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CourseListREQ {
  @IsNotEmpty()
  @IsNumber()
  idInstructor: number;
}
