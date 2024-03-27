import { ForbiddenException, GatewayTimeoutException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { LearningPathCreateREQ, GetRecommendedLearningPathREQ } from './request/learning-path-create.request';
import { LearningMaterialRESP } from '../learning-material/response/learning-material.response';
import { getStartEnd } from 'src/shared/contants.helper';
import { UserLearnerDTO } from 'src/domains/user/dto/user-learner.dto';
import { LearningLogDTO } from '../learner-log/dto/learning-log.dto';
import { TopicDTO } from 'src/domains/topic/dto/topic.dto';

@Injectable()
export class LearningPathService {
  constructor(private readonly prismaService: PrismaService) {}

  async calculateRecommendedOnes(learnerId: number, body: GetRecommendedLearningPathREQ) {
    await this.prismaService.learningPath.deleteMany({ where: { learnerId: learnerId } });

    const { start, end } = getStartEnd(body.goal);
    const style = UserLearnerDTO.learningStyle(body.learningStyleQA);
    /*let temp: {
      topicId: number;
      rating: number;
      similarity: number;
      lmID: number;
    }[][] = [];*/
    let temp: number[][] = [];

    const learnerIds = (
      await this.prismaService.learner.findMany({
        where: {
          qualification: body.qualification,
          backgroundKnowledge: body.backgroundKnowledge,
          activeReflective: style.activeReflective,
          visualVerbal: style.visualVerbal,
          sequentialGlobal: style.sequentialGlobal,
          sensitiveIntuitive: style.sequentialGlobal,
        },
        select: { id: true },
      })
    ).map((l) => l.id);

    const logs = (
      await this.prismaService.learnerLog.findMany({
        where: { learnerId: { in: learnerIds } },
        select: { learningMaterial: true, attempts: true, score: true, time: true },
      })
    ).map((log) => LearningLogDTO.fromEntity(log as any));

    const topicLink = await this.prismaService.topicLink.findMany({
      where: { state: true },
      select: { startId: true, endId: true },
    });
    const paths = TopicDTO.getTopicPath(topicLink, start, end);


    for (let i = 0; i < paths.length; i++) {
      temp.push([]);
      for (let j = 0; j < paths[i].length; j++) {
        const topicLogs = logs.filter((log) => log.topicId === paths[i][j]);
        let recommendLM = TopicDTO.getSimilarityLM(topicLogs);

        if (recommendLM.lmID === -1) {
          const lm = await this.prismaService.learningMaterial.findFirst({
            where: { topicId: paths[i][j] },
            orderBy: { rating: 'desc' },
            //select: { id: true, rating: true, name: true, score: true },
            select: { id: true } 
          });
          //recommendLM = { rating: lm.rating, similarity: 0, lmID: lm.id, name: lm.name, score: lm.score };
          recommendLM.lmID = lm.id;
        }
        //temp[i].push({ topicId: paths[i][j], ...recommendLM });
        temp[i].push(recommendLM.lmID);
      }
    }

    /*const result = temp.map(p => p.reduce((unique, current) => {
      const existingItem = unique.find((item) => item.lmID === current.lmID);
      if (!existingItem) unique.push(current);
      return unique;
    }, []));*/
    const result = temp.map(p => p.reduce((unique, currentId) => {
      const existingItem = unique.find(existId => existId === currentId);
      if (!existingItem) unique.push(currentId);
      return unique;
    }, []));

    return result;
  }

  async create(learnerId: number, body: LearningPathCreateREQ) {
    const result = this.prismaService.$transaction(async (tx) => {
      await Promise.all(
        body.LOs.map(
          async (id, index) =>
            await tx.learningPath.create({
              data: LearningPathCreateREQ.toCreateInput(learnerId, id, index),
            }),
        ),
      ).catch((error) => {
        throw new error();
      });
    });

    return result;
  }

  async detail(learnerId: number) {
    const paths = await this.prismaService.learningPath.findMany({
      where: { learnerId: learnerId },
      select: {
        learningMaterialOrder: true,
        learningMaterialId: true,
      },
    });
    const lmIds = paths.sort((a, b) => a.learningMaterialOrder - b.learningMaterialOrder).map((p) => p.learningMaterialId);

    const lms = await this.prismaService.learningMaterial.findMany({
      where: { id: { in: lmIds } },
      orderBy: { topicId: 'asc' },
      select: {
        id: true,
        name: true,
        difficulty: true,
        type: true,
        rating: true,
        score: true,
        time: true,
        topic: true,
      },
    });

    return lms.map((lm) => LearningMaterialRESP.fromEntity(lm as any));
  }
}
