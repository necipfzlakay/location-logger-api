import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logs } from './entities/logs.entitiy';

@Injectable()
export class LogsService {
  constructor(
    @InjectRepository(Logs)
    private readonly logsRepository: Repository<Logs>,
  ) { }

  async create(log: any) {
    try {
      return await this.logsRepository.save(log);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      return await this.logsRepository.find();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
