import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  connectServer(): string {
    return '<h1> AI learning system </h1>';
  }
}
