import { ForbiddenException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { LearningPathCreateREQ } from './request/learning-path-create.request';
import { LearningMaterialRESP } from '../learning-material/response/learning-material.response';
import { getStartEnd } from 'src/shared/contants.helper';
import { UserLearnerDTO } from 'src/domains/user/dto/user-learner.dto';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs';

@Injectable()
export class LearningPathService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  async create(learnerId: number, body: LearningPathCreateREQ) {
    const { start, end } = getStartEnd(body.goal);
    const style = UserLearnerDTO.learningStyle(body.learningStyleQA);

    const path = this.httpService
      .get(
        `http://127.0.0.1:8181/spraql-lm?qualification=${body.qualification}&background_knowledge=${body.backgroundKnowledge}&active_reflective=${style.activeReflective}&visual_verbal=${style.visualVerbal}&global_sequential=${style.sequentialGlobal}&sensitive_intuitive=${style.sensitiveIntuitive}&start=${start}&end=${end}`,
      )
      .pipe(map((res) => res.data))
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );

    return path;
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
