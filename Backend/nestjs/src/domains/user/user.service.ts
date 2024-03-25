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
import { getStartEnd } from 'src/shared/contants.helper';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(body: UserCreateREQ) {
    body.password = await bcrypt.hash(body.password, 10);
    const existUser = await this.prismaService.authenticatedUser.findFirst({ where: { username: body.username } });
    if (existUser) throw new ConflictException('User already exists', { cause: HttpStatus.CONFLICT });

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

  async createBatch(body: UserCreateREQ[]) {
    body.map(async (user) => this.create(user));
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
        sequentialGlobal: style.sequentialGlobal,
      },
    });
  }

  async getBaseInfo(learnerId: number) {
    const learner = await this.prismaService.learner.findFirstOrThrow({
      where: { id: learnerId },
      select: {
        activeReflective: true,
        sensitiveIntuitive: true,
        visualVerbal: true,
        sequentialGlobal: true,
        backgroundKnowledge: true,
        qualification: true,
      },
    });

    return {
      learningStyle: [learner.activeReflective, learner.visualVerbal, learner.sequentialGlobal, learner.sensitiveIntuitive],
      backgroundKnowledge: learner.backgroundKnowledge,
      qualification: learner.qualification
    }
  }
}
