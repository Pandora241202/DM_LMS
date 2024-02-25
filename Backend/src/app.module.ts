import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LearningPathModule } from './domains/learning-path/learning-path.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, LearningPathModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
