import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ForumService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(body: Prisma.ForumUncheckedCreateInput) {
        return await this.prismaService.forum.create({
            data: body,
        });
    }
}
