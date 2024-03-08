import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './services/prisma/prisma.module';
import { UserModule } from './domains/user/user.module';
import { OntologyModule } from './services/ontology/ontology.module';
import { LearningModule } from './domains/learning/learning.module';
import { TopicModule } from './domains/topic/topic.module';
import { ForumModule } from './domains/forum/forum.module';
@Module({
  imports: [PrismaModule, UserModule, OntologyModule, LearningModule, TopicModule, ForumModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
