import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { GetUsersLocationDto } from './dto/getLocation.dto';
import { LocationsService } from './locations.service';

@ApiTags('locations')
@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) { }

  /**
   * Gets the location of a user
   * and determines if the user is within a given area
   * then logs the user's location
   * @param getUsersLocationDto
   * */
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        user_id: { type: 'string', example: 'user-uuid' },
        long: { type: 'number' },
        lat: { type: 'number' },
      },
    },
    examples: {
      Taksim: {
        summary: 'Inside Taksim Area',
        description: 'Location coordinates inside Taksim polygon',
        value: {
          user_id: 'place_valid_user_id_here',
          long: 28.985,
          lat: 41.037,
        },
      },
      Kadikoy: {
        summary: 'Inside Kadikoy Area',
        description: 'Location coordinates inside Kadikoy polygon',
        value: {
          user_id: 'place_valid_user_id_here',
          long: 29.029,
          lat: 40.990,
        },
      },
      Outside: {
        summary: 'Outside Defined Areas',
        description: 'Location coordinates outside any defined area',
        value: {
          user_id: 'place_valid_user_id_here',
          long: 0,
          lat: 0,
        },
      },
    },
  })
  @Post()
  create(@Body() getUsersLocationDto: GetUsersLocationDto) {
    return this.locationsService.getUserLocation(getUsersLocationDto);
  }
}
