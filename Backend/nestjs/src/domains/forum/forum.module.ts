import { Module } from '@nestjs/common';
import { ForumService } from './forum.service';
import { StatementService } from './statement.service';
import { ForumController } from './forum.controller';
import { PrismaModule } from 'src/services/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ForumService, StatementService],
  controllers: [ForumController],
})
export class ForumModule {}
