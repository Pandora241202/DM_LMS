import { ConflictException, ForbiddenException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { UserCreateREQ } from './request/user-create.request';
import { AccountType, SubjectType } from '@prisma/client';
import { UserLearnerDTO } from './dto/user-learner.dto';
import { UserInfoDTO } from './dto/user-infomation.dto';
import { PaginationREQ } from 'src/shared/pagination.request';
import { UserUpdateREQ } from './request/user-update.request';
import * as bcrypt from 'bcrypt';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs';
import { BIG_DATA_ENGINEER, DATA_ENGINEER, DATA_SCIENTIST, DEEP_LEARNING, FUNDAMENTAL, MACHINE_LEARNING, getStartEnd } from 'src/shared/contants.helper';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  async create(body: UserCreateREQ) {
    body.password = await bcrypt.hash(body.password, 10);
    const existUser = await this.prismaService.authenticatedUser.findFirst({where: {username: body.username}})
    if (existUser) throw new ConflictException("User already exists", {cause: HttpStatus.CONFLICT})

    this.prismaService.$transaction(async (tx) => {
      const user = await tx.authenticatedUser.create({
        data: UserCreateREQ.toCreateInput(body),
      });

      if (body.accountType === AccountType.LEARNER) {
        await tx.learner.create({
          data: UserLearnerDTO.toCreateInput(user.id, body.learningStyleQA, body.backgroundKnowledge, body.qualification),
        });
      }

      return UserInfoDTO.fromEntity(user);
    });
  }

  async generatePaths(learnerId: number, goal: SubjectType) {
    const {start, end} = getStartEnd(goal)
    const learner = await this.prismaService.learner.findFirstOrThrow({
      where: { id: learnerId },
      select: UserLearnerDTO.selectLearner(),
    }); 

    if (!learner.activeReflective) throw new NotFoundException( 'No base information to recommend learning path', {cause: HttpStatus.NOT_FOUND});

    const paths = this.httpService
      .get(
        `http://127.0.0.1:8181/spraql-lm?qualification=${learner.qualification}&background_knowledge=${learner.backgroundKnowledge}&active_reflective=${learner.activeReflective}&visual_verbal=${learner.visualVerbal}&global_sequential=${learner.globalSequential}&sensitive_intuitive=${learner.sensitiveIntuitive}&start=${start}&end=${end}`,
      )
      .pipe(map((res) => res.data))
      .pipe(
        catchError(() => {
          throw new ForbiddenException('API not available');
        }),
      );

    return paths;
  }

  async detail(id: number) {
    const user = await this.prismaService.authenticatedUser.findUniqueOrThrow({ where: { id } });
    return UserInfoDTO.fromEntity(user);
  }

  async findAll(query: PaginationREQ) {
    const users = await this.prismaService.authenticatedUser.findMany({
      ...PaginationREQ.paging(query),
      select: UserInfoDTO.selectUser(),
    });

    return users.map((user) => UserInfoDTO.fromEntity(user));
  }

  async update(id: number, body: UserUpdateREQ) {
    return await this.prismaService.authenticatedUser.update({
      where: { id },
      data: UserUpdateREQ.toUpdateInput(body),
    });
  }

  async updateStyle(id: number, learningStyleQA: string[]) {
    const style = UserLearnerDTO.learningStyle(learningStyleQA);

    await this.prismaService.learner.update({
      where: { userId: id },
      data: {
        activeReflective: style.activeReflective,
        sensitiveIntuitive: style.sensitiveIntuitive,
        visualVerbal: style.visualVerbal,
        globalSequential: style.globalSequential,
      },
    });
  }
}
