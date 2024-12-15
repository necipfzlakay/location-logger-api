import { Injectable } from '@nestjs/common';
import { GetUsersLocationDto } from './dto/getLocation.dto';
import { UsersService } from 'src/users/users.service';
import { LogsService } from 'src/logs/logs.service';
import { AreasService } from 'src/areas/areas.service';

@Injectable()
export class LocationsService {
  constructor(
    private readonly userService: UsersService,
    private readonly logService: LogsService,
    private readonly areaService: AreasService,
  ) {}

  async getUserLocation(getUsersLocationDto: GetUsersLocationDto) {
    console.log('user location', getUsersLocationDto);

    const user = await this.userService.findById(getUsersLocationDto.user_id);
    if (!user) throw new Error('User not found');

    const areas = await this.areaService.findAll();
    if (areas.length < 1) throw new Error('Areas not found');
    const userPoint = [getUsersLocationDto.long, getUsersLocationDto.lat];

    areas.forEach((area) => {
      // console.log(area);
      const iss = this.isPointInPolygon(userPoint, area.polygon);
      console.log(iss, getUsersLocationDto);
      // console.log('area', area);
      if (iss) {
        console.log('User is in the area');
        this.logService.create({
          user_id: getUsersLocationDto.user_id,
          area_id: area.id,
          lat: parseFloat(getUsersLocationDto.lat.toFixed(6)),
          long: parseFloat(getUsersLocationDto.long.toFixed(6)),
          description: 'User is in the area',
        });
      }
    });
    return { userPoint, ...getUsersLocationDto };
  }

  /**
   * Bir noktanın bir çokgenin içinde olup olmadığını kontrol eder.
   * longitute = [0]
   * latitude = [1]
   * @param point Kontrol edilecek nokta
   * @param polygon Çokgenin köşe noktaları
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
        py = point[0]; // Noktanın Longitude ve Latitude
      console.log(
        'xi:',
        xi,
        'yi:',
        yi,
        'xj:',
        xj,
        'yj:',
        yj,
        'px:',
        px,
        'py:',
        py,
      );

      // Çokgenin kenarları boyunca kontrol yapar
      const intersect =
        yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi;

      if (intersect) isInside = !isInside;
    }

    return isInside;
  }
}
