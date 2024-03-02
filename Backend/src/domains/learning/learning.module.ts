import { Module } from "@nestjs/common";
import { PrismaService } from "src/services/prisma/prisma.service";
import { LearningService } from "./learning.service";

@Module({
    imports: [PrismaService],
    providers: [LearningService],
    exports: [LearningService]
})

export class LearningModule {}