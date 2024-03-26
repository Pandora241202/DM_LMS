import { ForbiddenException, GatewayTimeoutException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { LearningPathCreateREQ } from './request/learning-path-create.request';
import { LearningMaterialRESP } from '../learning-material/response/learning-material.response';
import { getStartEnd } from 'src/shared/contants.helper';
import { UserLearnerDTO } from 'src/domains/user/dto/user-learner.dto';
import { HttpService } from '@nestjs/axios';
import { TimeoutError, catchError, map, timeout } from 'rxjs';
import { BackgroundKnowledgeType, QualificationType } from '@prisma/client';
import { LearningLogDTO } from '../learner-log/dto/learning-log.dto';
import { TopicDTO } from 'src/domains/topic/dto/topic.dto';

@Injectable()
export class LearningPathService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  async create(learnerId: number, body: LearningPathCreateREQ) {
    const { start, end } = getStartEnd(body.goal);
    const style = UserLearnerDTO.learningStyle(body.learningStyleQA);

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
    console.log(learnerIds);

    const logs = (
      await this.prismaService.learnerLog.findMany({
        where: { learnerId: { in: learnerIds } },
        select: { learningMaterial: true, attempts: true, score: true, time: true },
      })
    ).map((log) => LearningLogDTO.fromEntity(log as any));

    const topicLink = await this.prismaService.topicLink.findMany({ select: { startId: true, endId: true } });
    const paths = TopicDTO.getTopicPath(topicLink, start, end);

    // for (let i = 0; i < paths.length; i++) {
    //   console.log('------', paths[i]);
    //   for (let j = 0; j < paths[i].length; j++) {
    //     const topicLogs = logs.filter((log) => log.topicId === paths[i][j]);
    //     console.log(paths[i][j], TopicDTO.getSimilarityLM(topicLogs))
    //   }
    // }
    const topicLogs = logs.filter((log) => log.topicId === paths[0][1]);
    console.log(paths[0][1], TopicDTO.getSimilarityLM(topicLogs))
    return;
  }

  async detail(learnerId: number) {
    const paths = await this.prismaService.learningPath.findMany({
      where: { learnerId: learnerId },
      select: {
        learningMaterialOrder: true,
        learningMaterialId: true,
      },
    });
    // if (paths.length === 0) throw new NotFoundException();
    const lmIds = paths.sort((a, b) => a.learningMaterialOrder - b.learningMaterialOrder).map((p) => p.learningMaterialId);

    const lms = await this.prismaService.learningMaterial.findMany({
      where: { id: { in: lmIds } },
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
