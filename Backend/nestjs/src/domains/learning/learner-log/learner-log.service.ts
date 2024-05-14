import { Injectable } from '@nestjs/common';
import { LearnerLogCreateREQ } from './request/learner-log-create.request';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { LearningLogDTO } from './dto/learning-log.dto';
import { LearningMaterialType } from '@prisma/client';
import { CodeDTO, QuizDTO } from '../learning-material/dto/learning-material.dto';
import { FileDTO } from 'src/services/file/dto/file.dto';
import * as fs from 'fs'

@Injectable()
export class LearnerLogService {
  constructor(private readonly prismaService: PrismaService) {}

  async getScoreOfCode(codeId : number, learnerAnswers: string[]) {
    const outputFileIds = (await this.prismaService.code.findMany({where: {id: codeId}, select: {outputFileId: true}})).map(f => (f.outputFileId))
    const files = await this.prismaService.file.findMany({where: {id: {in :outputFileIds}}})
    const fileNames = files.map(f => (FileDTO.fromEntity(f as any).fileName))
    let score: number = 0

    fileNames.map((fileName, index) => {
      let output: string
      fs.readFile(`uploads/materialFiles/${fileName}`, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        output = data
      });
  
      if (output === learnerAnswers[index]) score += 1
    })
    return score
  }

  async getScoreOfQuiz(quizId: number, learnerAnswers: number[]) {
    const quiz = await this.prismaService.quiz.findMany({where: {id: quizId}, include: {question: {include: {choice: true}}}});
    const correctAnswers = QuizDTO.fromEntity(quiz as any).correctAnswers
    let score: number = 0
    
    for (let i = 0 ; i < correctAnswers.length; i++)
      if (correctAnswers[i] === learnerAnswers[i]) score += 1

    return score
  }

  async create(userID: number, body: LearnerLogCreateREQ) {
    await this.prismaService.learnerLog.updateMany({
      where: { learnerId: userID, learningMaterialId: body.learningMaterialId, state: true },
      data: { state: false },
    });

    const lm = await this.prismaService.learningMaterial.findFirst({
      where: { id: body.learningMaterialId },
      select: { rating: true, type: true, Exercise: true, Other: true },
    });
    
    let score: number = 10;
    if (lm.type === LearningMaterialType.CODE) score = await this.getScoreOfCode(lm.Exercise.codeId, body.learnerAnswer as string[])
    else if (lm.type === LearningMaterialType.QUIZ) score = await this.getScoreOfQuiz(lm.Exercise.quizId, body.learnerAnswer as number[])

    const log = await this.prismaService.learnerLog.create({ data: LearnerLogCreateREQ.toCreateInput(userID, body, score), select: {id: true} });

    await this.prismaService.learningPath.updateMany({
      data: { learned: true },
      where: { learningMaterialId: body.learningMaterialId, learnerId: userID },
    });

    const updateRating = (lm.rating + body.rating) / 2;
    await this.prismaService.learningMaterial.update({ where: { id: body.learningMaterialId }, data: { rating: updateRating } });

    return {id: log.id}
  }

  async createBatch(body: LearnerLogCreateREQ[]) {
    for (let i = 0; i < body.length; i++) {
      await this.prismaService.learnerLog.create({ data: LearnerLogCreateREQ.toCreateBatchInput(body[i]) });
      await this.prismaService.learningPath.updateMany({ data: { learned: true }, where: { learnerId: body[i].learnerId } });
    }
  }

  async detail(learnerId: number) {
    const log = await this.prismaService.learnerLog.findMany({
      where: { learnerId: learnerId },
      select: {
        learningMaterialId: true,
        learningMaterialVisittedTime: true,
        attempts: true,
        score: true,
        time: true,
        learningMaterialRating: true,
        learningMaterial: true,
      },
    });

    return log.map((l) => LearningLogDTO.fromEntity(l as any));
  }
}
