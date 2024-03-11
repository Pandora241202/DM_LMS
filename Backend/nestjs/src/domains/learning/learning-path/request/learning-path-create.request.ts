import { Prisma } from '@prisma/client';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import { connectRelation } from 'src/shared/prisma.helper';

export class LearningPathCreateREQ {
  @IsNotEmpty()
  @IsNumber()
  learningMaterialOrder: number;

  @IsNotEmpty()
  @IsNumber()
  learningMaterialId: number;

  static toCreateInput(userID: number, body: LearningPathCreateREQ): Prisma.LearningPathCreateInput {
    return {
      learningMaterialOrder: body.learningMaterialOrder,
      learned: false,
      learner: connectRelation(userID),
      learningMaterial: connectRelation(body.learningMaterialId),
    };
  }
}
