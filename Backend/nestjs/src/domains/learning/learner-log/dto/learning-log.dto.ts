import { LearningMaterial, Prisma } from '@prisma/client';

export class LearningLogDTO {
  lmID: number;
  attempt: number;
  score: number;
  time: number;
  topicID: number;
  rating: number;
  maxTime: number;
  difficulty: number;

  static fromEntity(e: Prisma.LearnerLogGetPayload<{ include: { learningMaterial: true } }>): LearningLogDTO {
    return {
      lmID: e.learningMaterial.id,
      attempt: e.attempts,
      score: e.score,
      time: e.time,
      topicID: e.learningMaterial.topicId,
      rating: e.learningMaterial.rating,
      maxTime: e.learningMaterial.time,
      difficulty: e.learningMaterial.difficulty,
    };
  }
}
