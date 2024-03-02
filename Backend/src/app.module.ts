import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './services/prisma/prisma.module';
import { UserModule } from './domains/user/user.module';
import { OntologyModule } from './services/ontology/ontology.module';

@Module({
  imports: [PrismaModule, UserModule, OntologyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
