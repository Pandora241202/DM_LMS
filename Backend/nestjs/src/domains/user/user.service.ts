import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { UserCreateREQ } from './request/user-create.request';
import { AccountType } from '@prisma/client';
import { UserLearnerDTO } from './dto/user-learner.dto';
import { UserInfoDTO } from './dto/user-infomation.dto';
import { PaginationREQ } from 'src/shared/pagination.request';
import { UserUpdateREQ } from './request/user-update.request';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(body: UserCreateREQ) {
    body.password = await bcrypt.hash(body.password, 10);
    const user = await this.prismaService.authenticatedUser.create({
      data: UserCreateREQ.toCreateInput(body),
      select: { id: true },
    });

    if (body.accountType === AccountType.LEARNER) {
      await this.prismaService.learner.create({
        data: UserLearnerDTO.toCreateInput(user.id, body.learningStyleQA, body.backgroundKnowledge, body.qualification),
      });
    }
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
}
