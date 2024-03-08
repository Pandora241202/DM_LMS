import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class ForumService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(data: Prisma.ForumUncheckedCreateInput) {
        return await this.prismaService.forum.create({
            data: data,
        });
    }

    async getAll() {
        return await this.prismaService.forum.findMany({
            select: {
                id: true,
                title: true,
                label: true,
                shortDescription: true,
                coverImage:  true,
                created_at:  true,
                updated_at:  true,
                userId:  true,
            },
        });
    }

    async getOne(id: number) {
        return await this.prismaService.forum.findFirst({
            where: { id: id },
        });
    }

    async getAllOwned(userId: number) {
        return await this.prismaService.forum.findMany({
            select: {
                id: true,
                title: true,
                label: true,
                shortDescription: true,
                coverImage:  true,
                created_at:  true,
                updated_at:  true,
                userId:  true,
            },
            where: { userId: userId },
        });
    }

    async updateOne(id: number, data: Prisma.ForumUncheckedUpdateInput) {
        return await this.prismaService.forum.update({
            where: { id: id },
            data: data,
        });
    }
}