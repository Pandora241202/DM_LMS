import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LearningPathModule } from './domains/learning-path/learning-path.module';
import { ForumModule } from './domains/forum/forum.module';
import { PrismaModule } from './service/prisma/prisma.module';

@Module({
  imports: [PrismaModule, LearningPathModule, ForumModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
