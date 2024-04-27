import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { LearningMaterialCreateREQ, Quiz, Code } from './request/learning-material-create.request';
import { LearningMaterialType } from '@prisma/client';
import { CodeDTO, QuizDTO } from './dto/learning-material.dto';
import { connectRelation } from 'src/shared/prisma.helper';
import { FileService } from 'src/services/file/file.service';
import { FileDTO } from 'src/services/file/dto/file.dto';

@Injectable()
export class LearningMaterialService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly fileService: FileService,
  ) {}

  async create(body: LearningMaterialCreateREQ) {
    const lm = await this.prismaService.learningMaterial.create({
      data: LearningMaterialCreateREQ.toCreateInput(body),
      select: { id: true },
    });

    if (body.type === LearningMaterialType.CODE || body.type === LearningMaterialType.QUIZ) {
      const exercise = await this.prismaService.exercise.create({ data: {}, select: { id: true } });
      if (body.type === LearningMaterialType.QUIZ) {
        this.createQuiz(body.quiz, exercise.id);
      } else this.createCode(body.code, exercise.id);

      await this.prismaService.learningMaterial.update({
        where: { id: lm.id },
        data: { Exercise: connectRelation(exercise.id) },
      });
    } else {
      const other = await this.prismaService.other.create({ data: { file: connectRelation(body.fileId) }, select: { id: true } });

      await this.prismaService.learningMaterial.update({
        where: { id: lm.id },
        data: { Other: connectRelation(other.id) },
      });
    }

    return { id: lm.id };
  }

  async createQuiz(quiz: Quiz, exerciseId: number) {
    const { duration, shuffle, questions, choices, correctAnswers } = QuizDTO.formatting(quiz);

    const _quiz = await this.prismaService.quiz.create({
      data: { duration: duration, shuffleQuestions: shuffle, Exercise: connectRelation(exerciseId) },
      select: { id: true },
    });

    for (let i = 0; i < questions.length; i++) {
      const question = await this.prismaService.question.create({
        data: { content: questions[i], Quiz: connectRelation(_quiz.id) },
        select: { id: true },
      });

      for (let j = 0; j < choices[i].length; j++) {
        await this.prismaService.answer.create({
          data: {
            content: choices[i][j],
            correctness: j == correctAnswers[i] ? true : false,
            Question: connectRelation(question.id),
          },
        });
      }
    }
  }

  async createCode(code: Code, exerciseId: number) {
    await this.prismaService.code.create({
      data: {
        question: code.question,
        inputFile: connectRelation(code.inputId),
        outputFile: connectRelation(code.outputId),
        Exercise: connectRelation(exerciseId),
      },
    });
  }

  async createMany(body: LearningMaterialCreateREQ[]) {
    body.map(
      async (data) => await this.prismaService.learningMaterial.create({ data: LearningMaterialCreateREQ.toCreateInput(data) }),
    );
  }

  async detail(id: number) {
    let type: string = '',
      DTO;

    const lm = await this.prismaService.learningMaterial.findFirst({
      where: { id },
      select: { type: true, Exercise: { select: { quizId: true, codeId: true } }, Other: { select: { fileId: true } } },
    });
    if (!lm) throw new NotFoundException("Couldn't find learning material");

    if (lm.type === LearningMaterialType.CODE) {
      const code = await this.prismaService.code.findFirst({
        where: { id: lm.Exercise.codeId },
        select: { inputFile: true, outputFile: true, question: true },
      });
      if (!code) throw new NotFoundException("Couldn't find learning material");

      type = 'CODE';
      DTO = CodeDTO.fromEntity(code as any);
    } 
    else if (lm.type === LearningMaterialType.QUIZ) {
      const quiz = await this.prismaService.quiz.findFirst({
        where: { id: lm.Exercise.quizId },
        select: { duration: true, question: { include: { choice: true } } },
      });

      if (!quiz) throw new NotFoundException("Couldn't find learning material");

      type = 'QUIZ';
      DTO = QuizDTO.fromEntity(quiz as any);
    } 
    else {
      const file = await this.prismaService.file.findFirst({ where: { id: lm.Other.fileId } });
      if (!file) throw new NotFoundException("Couldn't find learning material");

      type = 'OTHER';
      DTO = FileDTO.fromEntity(file as any);
    }

    return {
      type,
      DTO,
    };
  }

  async list() {
    const lms = await this.prismaService.learningMaterial.findMany({
      select: {
        id: true,
        name: true,
        time: true,
        type: true,
        topicId: true,
      },
    });

    return lms;
  }
}
