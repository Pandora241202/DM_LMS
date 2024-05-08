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
import { CourseModule } from './domains/courses/courses.module';
import { LessonModule } from './domains/lessons/lessons.module';
import { FileModule } from './services/file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ModelModule } from './domains/model/model.module';
import { ModelVariationModule } from './domains/modelVariation/modelVariation.module';
import { DatasetModule } from './domains/dataset/dataset.module';
import { NotebookModule } from './domains/notebook/notebook.module';
import { join } from 'path';
@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    LearningModule,
    TopicModule,
    OntologyModule,
    ForumModule,
    CourseModule,
    LessonModule,
    FileModule,
    ModelModule,
    ModelVariationModule,
    DatasetModule,
    NotebookModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads', 'forumImages'),
      serveRoot: '/forumImages',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads', 'modelVariations'),
      serveRoot: '/modelVariations',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads', 'datasets'),
      serveRoot: '/datasets',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
