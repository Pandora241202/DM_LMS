import { Prisma } from '@prisma/client';
import { Quiz } from '../request/learning-material-create.request';

export class CodeDTO {
  question: string;
  inputName: string;
  outputName: string;

  static fromEntity(entity: Prisma.CodeGetPayload<{ include: { inputFile: true; outputFile: true } }>): CodeDTO {
    const { question, inputFile, outputFile } = entity;
    const inputName = `${inputFile.prefix}--${inputFile.name}`;
    const outputName = `${outputFile.prefix}--${outputFile.name}`;

    return {
      question,
      inputName,
      outputName,
    };
  }
}

export class QuizDTO {
  duration: number;
  shuffle: boolean;
  questions: string[];
  choices: string[][];
  correctAnswers: number[];

  static formatting(quiz: Quiz): QuizDTO {
    const duration: number = quiz.duration,
      shuffle: boolean = quiz.shuffle;

    let questions: string[] = [],
      choices: string[][] = [],
      correctAnswers: number[] = [];

    for (let i = 0; i < quiz.questionaires.length; i++) {
      questions.push(quiz.questionaires[i].question);
      choices.push(quiz.questionaires[i].choices);
      correctAnswers.push(quiz.questionaires[i].correctAnswer);
    }

    return {
      duration,
      shuffle,
      questions,
      choices,
      correctAnswers,
    };
  }

  static fromEntity(entity: Prisma.QuizGetPayload<{ include: { question: { include: { choice: true } } } }>): QuizDTO {
    const duration = Number(entity.duration);
    const choices = entity.question.map((q) => q.choice.map((c) => c.content));
    const questions = entity.question.map((q) => q.content);
    const correctAnswers = entity.question.map((q) => q.choice.findIndex((c) => c.correctness === true));

    return {
      duration: duration,
      shuffle: entity.shuffleQuestions,
      questions: questions,
      choices: choices,
      correctAnswers: correctAnswers,
    };
  }
}
