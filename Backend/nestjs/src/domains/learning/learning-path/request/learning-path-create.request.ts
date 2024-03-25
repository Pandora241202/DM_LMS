import { BackgroundKnowledgeType, Prisma, QualificationType, SubjectType } from '@prisma/client';
import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { connectManyRelation, connectRelation } from 'src/shared/prisma.helper';

export class LearningPathCreateREQ {
  @IsEnum(SubjectType)
  goal: SubjectType;

  @IsOptional()
  @IsArray()
  learningStyleQA: string[] = null;

  @IsOptional()
  @IsEnum(BackgroundKnowledgeType)
  backgroundKnowledge: BackgroundKnowledgeType = BackgroundKnowledgeType.BASIC;

  @IsOptional()
  @IsEnum(QualificationType)
  qualification: QualificationType = QualificationType.HIGHSCHOOL;

  static toCreateInput(learnerId: number, lmId: number, learningMaterialOrder: number): Prisma.LearningPathCreateInput {
    return {
      learningMaterialOrder: learningMaterialOrder,
      learned: false,
      learner: connectRelation(learnerId),
      learningMaterial: connectRelation(lmId),
    };
  }
}
