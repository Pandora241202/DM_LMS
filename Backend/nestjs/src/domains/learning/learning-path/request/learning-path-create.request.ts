import { Prisma } from '@prisma/client';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import { connectManyRelation, connectRelation } from 'src/shared/prisma.helper';

export class LearningPathCreateREQ {
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  lmIds: number[];

  static toCreateInput(learnerId: number, lmId: number, learningMaterialOrder: number): Prisma.LearningPathCreateInput {
    return {
      learningMaterialOrder: learningMaterialOrder,
      learned: false,
      learner: connectRelation(learnerId),
      learningMaterial: connectRelation(lmId),
    };
  }
}
