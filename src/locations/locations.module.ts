import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { UsersModule } from 'src/users/users.module';
import { LogsModule } from 'src/logs/logs.module';
import { AreasModule } from 'src/areas/areas.module';

@Module({
  imports: [UsersModule, LogsModule, AreasModule],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
