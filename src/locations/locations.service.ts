import { Injectable } from '@nestjs/common';
import { AreasService } from 'src/areas/areas.service';
import { UsersService } from 'src/users/users.service';
import { GetUsersLocationDto } from './dto/getLocation.dto';

@Injectable()
export class LocationsService {
  constructor(
    private readonly userService: UsersService,
    private readonly areaService: AreasService,
  ) { }

  /**
   * Gets the location of a user and determines if the user is within a given area
   * then logs the user's location
   * @param getUsersLocationDto
   */
  async getUserLocation(getUsersLocationDto: GetUsersLocationDto) {
    console.log('user location', getUsersLocationDto);

    // Check if the user exists
    const user = await this.userService.findById(getUsersLocationDto.user_id);
    if (!user) throw new Error('User not found');

  }


  isPointInPolygon(): boolean {
    let isInside = false;

    return isInside;
  }
}
