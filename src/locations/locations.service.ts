import { Injectable } from '@nestjs/common';
import { AreasService } from 'src/areas/areas.service';
import { LogsService } from 'src/logs/logs.service';
import { UsersService } from 'src/users/users.service';
import { GetUsersLocationDto } from './dto/getLocation.dto';

@Injectable()
export class LocationsService {
  constructor(
    private readonly userService: UsersService,
    private readonly logService: LogsService,
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
    // Check is there any valid area
    const areas = await this.areaService.findAll();
    if (areas.length < 1) throw new Error('Areas not found');
    const userPoint = [getUsersLocationDto.long, getUsersLocationDto.lat];

    // Check every area with user location in the foreach loop
    areas.forEach((area) => {
      // Runs the isPointInPolygon function for each area for checking if the user is in the area
      const isPointInPolygon = this.isPointInPolygon(userPoint, area.polygon);
      if (isPointInPolygon) {
        // If the user is in the area, logs the user's location
        console.log('User is in the area', getUsersLocationDto);
        this.logService.create({
          user_id: getUsersLocationDto.user_id,
          area_id: area.id,
          lat: getUsersLocationDto.lat,
          long: getUsersLocationDto.long,
          description: 'User is in the area',
        });
      }
    });
    return { userPoint, ...getUsersLocationDto };
  }

  /**
   * Determines if a point is inside a polygon
   * longitute = [0]
   * latitude = [1]
   * @param point User location
   * @param polygon Area polygon points
   * @returns boolean
   */
  isPointInPolygon(point: any, polygon: any[]): boolean {
    let isInside = false;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i][1],
        yi = polygon[i][0]; // Longitude ve Latitude
      const xj = polygon[j][1],
        yj = polygon[j][0]; // Longitude ve Latitude
      const px = point[1],
        py = point[0];

      // check if the point is on the edge of the polygon
      const intersect =
        yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi;

      if (intersect) isInside = !isInside;
    }

    return isInside;
  }
}
