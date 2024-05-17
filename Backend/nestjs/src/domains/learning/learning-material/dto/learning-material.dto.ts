import { Prisma } from '@prisma/client';
import { Quiz } from '../request/learning-material-create.request';

export class CodeDTO {
  name: string;
  question: string;
  exampleCode: string;

  static fromEntity(name: string, entity: Prisma.CodeGetPayload<unknown>): CodeDTO {
    const { question, exampleCode } = entity;
    return {
      name,
      question,
      exampleCode,
    };
  }
}

export class QuizDTO {
  name: string;
  duration: number;
  shuffle: boolean;
  questions: string[];
  choices: string[][];
  correctAnswers: number[];

  static fromEntity(name: string, entity: Prisma.QuizGetPayload<{ include: { question: { include: { choice: true } } } }>): QuizDTO {
    const duration = entity.duration ? Number(entity.duration) : 0;
    const choices = entity.question.map((q) => q.choice.map((c) => c.content));
    const questions = entity.question.map((q) => q.content);
    const correctAnswers = entity.question.map((q) => q.choice.findIndex((c) => c.correctness === true));

    return {
      name: name,
      duration: duration,
      shuffle: entity.shuffleQuestions,
      questions: questions,
      choices: choices,
      correctAnswers,
    };
  }
}
