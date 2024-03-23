import { BackgroundKnowledgeType, Prisma, QualificationType } from '@prisma/client';
import { connectRelation } from 'src/shared/prisma.helper';

export class UserLearnerDTO {
  activeReflective: number;
  sensitiveIntuitive: number;
  visualVerbal: number;
  globalSequential: number;
  backgroundKnowledge: BackgroundKnowledgeType;
  qualification: QualificationType;

  static convertScore(st: number, answer: string[]) {
    let a = 0,
      b = 0;
    while (st <= 44) {
      if (answer[st] === 'A') a++;
      else b++;
      st += 4;
    }

    const dist = Math.abs(a - b);
    if (dist === 1 || dist === 3) return 0;
    if (dist === 5 || dist === 7) return a > b ? -1 : 1;
    return a > b ? -2 : 2;
  }

  static learningStyle(answer: string[]) {
    const activeReflective = this.convertScore(1, answer),
      sensitiveIntuitive = this.convertScore(2, answer),
      visualVerbal = this.convertScore(3, answer),
      globalSequential = this.convertScore(4, answer);

    return {
      activeReflective,
      sensitiveIntuitive,
      visualVerbal,
      globalSequential,
    };
  }

  static selectLearner(): Prisma.LearnerSelect {
    return {
      id: true,
      qualification: true,
      backgroundKnowledge: true,
      activeReflective: true,
      sensitiveIntuitive: true,
      visualVerbal: true,
      globalSequential: true,
    };
  }

  static toCreateInput(
    userId: number,
    learningStyleQA: string[] = null,
    backgroundKnowledge: BackgroundKnowledgeType = BackgroundKnowledgeType.BASIC,
    qualification: QualificationType = QualificationType.HIGH_SCHOOL,
  ): Prisma.LearnerCreateInput {
    const style = learningStyleQA
      ? this.learningStyle(learningStyleQA)
      : { activeReflective: 0, sensitiveIntuitive: 0, visualVerbal: 0, globalSequential: 0 };

    return {
      activeReflective: style.activeReflective,
      sensitiveIntuitive: style.sensitiveIntuitive,
      visualVerbal: style.visualVerbal,
      globalSequential: style.globalSequential,
      backgroundKnowledge: backgroundKnowledge,
      qualification: qualification,
      user: connectRelation(userId),
    };
  }
}
