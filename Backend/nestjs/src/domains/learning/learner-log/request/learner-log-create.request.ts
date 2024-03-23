import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { connectRelation } from 'src/shared/prisma.helper';

export class LearnerLogCreateREQ {
  @IsNotEmpty()
  @IsNumber()
  learningMaterialId: number;

  @IsOptional()
  @IsNumber()
  score: number;

  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsNotEmpty()
  @IsNumber()
  time: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  attempts: number;

  static toCreateInput(userID: number, body: LearnerLogCreateREQ): Prisma.LearnerLogCreateInput {
    return {
      learningMaterialVisittedTime: Date.now(),
      learningMaterialRating: body.rating,
      score: body.score,
      time: body.time,
      attempts: body.attempts,
      learningMaterial: connectRelation(body.learningMaterialId),
      learner: connectRelation(userID),
    };
  }
}
