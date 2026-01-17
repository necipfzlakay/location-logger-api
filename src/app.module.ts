import { DatabaseModule } from '@app/database';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AreasModule } from './areas/areas.module';
import { LocationsModule } from './locations/locations.module';
import { LogsModule } from './logs/logs.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule, // @postgres:16 Database
    AreasModule,
    LocationsModule,
    UsersModule,
    LogsModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
