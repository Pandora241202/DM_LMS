import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma/prisma.service';
import { UserCreateREQ } from './request/user-create.request';
import { AccountType } from '@prisma/client';
import { UserLearnerDTO } from './dto/user-learner.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(body: UserCreateREQ) {
    const user = await this.prismaService.authenticatedUser.create({
      data: UserCreateREQ.toCreateInput(body),
      select: { id: true },
    });
    if (body.accountType === AccountType.LEARNER)
      await this.prismaService.learner.create({
        data: UserLearnerDTO.toCreateInput(user.id, body.learningStyleQA, body.backgroundKnowledge, body.qualification),
      });
  }

  async detail(id: number) {
    return await this.prismaService.authenticatedUser.findUniqueOrThrow({ where: { id } });
  }
}
