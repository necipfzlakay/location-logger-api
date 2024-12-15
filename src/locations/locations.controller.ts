import { Body, Controller, Post } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { GetUsersLocationDto } from './dto/getLocation.dto';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  create(@Body() getUsersLocationDto: GetUsersLocationDto) {
    return this.locationsService.getUserLocation(getUsersLocationDto);
  }
}
