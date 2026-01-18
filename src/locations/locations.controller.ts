import { Body, Controller, Post } from '@nestjs/common';
import { GetUsersLocationDto } from './dto/getLocation.dto';
import { LocationsService } from './locations.service';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) { }

  /**
   * Gets the location of a user
   * and determines if the user is within a given area
   * then logs the user's location
   * @param getUsersLocationDto
   * */
  @Post()
  create(@Body() getUsersLocationDto: GetUsersLocationDto) {
    return this.locationsService.getUserLocation(getUsersLocationDto);
  }
}
