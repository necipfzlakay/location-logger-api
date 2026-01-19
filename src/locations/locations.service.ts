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
    // Check if the user exists
    // Optimization Note: In extremely high load, user check might also be cached or skipped
    // if trusting the source (e.g. JWT token verified before controller).
    const user = await this.userService.findById(getUsersLocationDto.user_id);
    if (!user) throw new Error('User not found');

    // Use cached areas to prevent DB flooding
    const areas = await this.getCachedAreas();

    // If cache is empty (e.g. first run or no areas), try to fetch once or warn
    if (areas.length < 1) {
      // Optional: Try to refresh cache if empty, or just return.
      console.warn('No areas found in cache.');
      // We can return early as there are no areas to check against
      return { userPoint: [getUsersLocationDto.long, getUsersLocationDto.lat], ...getUsersLocationDto };
    }

    const userPoint = [getUsersLocationDto.long, getUsersLocationDto.lat];
    const logPromises: Promise<any>[] = [];

    // Use a loop that supports async properly, or map to promises for parallelism
    for (const area of areas) {
      // Runs the isPointInPolygon function for each area for checking if the user is in the area
      const isPointInPolygon = this.isPointInPolygon(userPoint, area.polygon);

      if (isPointInPolygon) {
        // Prepare log creation promise
        logPromises.push(
          this.logService.create({
            user_id: getUsersLocationDto.user_id,
            area_id: area.id,
            lat: getUsersLocationDto.lat,
            long: getUsersLocationDto.long,
            description: 'User is in the area',
          })
        );
      }
    }

    // Execute all log writes in parallel
    if (logPromises.length > 0) {
      await Promise.all(logPromises);
    }

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

  /**
   * Get Areas from cache
   */
  async getCachedAreas() {
    const areas = this.areaService.getCachedAreas();
    if (areas.length < 1) {
      await this.areaService.refreshCache();
    }
    return this.areaService.getCachedAreas();
  }
}
