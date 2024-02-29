import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LearningPathModule } from './domains/learning-path/learning-path.module';
import { PrismaModule } from './service/prisma/prisma.module';
import { UserModule } from './domains/user/user.module';
import { OntologyModule } from './service/ontology/ontology.module';

@Module({
  imports: [PrismaModule, LearningPathModule, UserModule, OntologyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
