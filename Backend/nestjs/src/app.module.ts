import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './services/prisma/prisma.module';
import { UserModule } from './domains/user/user.module';
import { OntologyModule } from './services/ontology/ontology.module';
import { LearningModule } from './domains/learning/learning.module';
import { TopicModule } from './domains/topic/topic.module';
import { ForumModule } from './domains/forum/forum.module';
import { AuthModule } from './domains/auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [PrismaModule, AuthModule, UserModule, LearningModule, TopicModule, OntologyModule, ForumModule, ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'uploads', 'forumImages'),
    serveRoot: '/forumImages',
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
