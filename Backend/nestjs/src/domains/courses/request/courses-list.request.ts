import { IsNotEmpty, IsNumber } from 'class-validator';

export class CourseListREQ {
  @IsNotEmpty()
  @IsNumber()
  instructorId: number;
}
