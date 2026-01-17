import { DatabaseModule } from '@app/database';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AreasModule } from './areas/areas.module';
import { LocationsModule } from './locations/locations.module';
import { UsersModule } from './users/users.module';
import { LogsModule } from './logs/logs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule, // Postgres Database
    AreasModule,
    LocationsModule,
    UsersModule,
    LogsModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
