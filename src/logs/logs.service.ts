import { Injectable } from '@nestjs/common';

@Injectable()
export class LogsService {

  async create(log: any) {
    return log;
  }
}
