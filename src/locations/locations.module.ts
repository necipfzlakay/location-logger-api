import { Module } from '@nestjs/common';
import { AreasModule } from 'src/areas/areas.module';
import { LogsModule } from 'src/logs/logs.module';
import { UsersModule } from 'src/users/users.module';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';

@Module({
  imports: [UsersModule, LogsModule, AreasModule],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule { }
