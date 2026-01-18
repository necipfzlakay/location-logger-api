import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logs } from './entities/logs.entitiy';
import { LogsController } from './logs.controller';
import { LogsService } from './logs.service';

@Module({
  imports: [TypeOrmModule.forFeature([Logs])],
  controllers: [LogsController],
  providers: [LogsService],
  exports: [LogsService],
})
export class LogsModule { }
