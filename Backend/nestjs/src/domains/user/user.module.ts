import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/services/prisma/prisma.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { OntologyModule } from 'src/services/ontology/ontology.module';

@Module({
  imports: [PrismaModule, OntologyModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
