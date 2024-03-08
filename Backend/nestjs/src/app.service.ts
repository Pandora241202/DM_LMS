import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  connectServer(): string {
    return 'AI learning system';
  }
}
