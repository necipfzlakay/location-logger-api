import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import { Repository } from 'typeorm';
import { CreateAreaDto } from './dto/create-area.dto';
import { Areas } from './entities/area.entity';

@Injectable()
export class AreasService {
  constructor(
    @InjectRepository(Areas)
    private readonly areasRepository: Repository<Areas>,
  ) { }

  /**
   * Creates an area with given coordinates
   * @param createAreaDto
   * */
  async create(createAreaDto: CreateAreaDto) {
    try {
      // prevent invalid coordinates
      createAreaDto.polygon.forEach(([long, lat]) => {
        if (long < -180 || long > 180)
          throw Error('longitude must be between -180 and 180');
        if (lat < -90 || lat > 90)
          throw Error('latitude must be between -90 and 90');
      });

      // prevent duplicate area names
      const name = await this.areasRepository.findBy({
        name: createAreaDto.name,
      });
      console.log('area===>', name);

      if (name.length > 0) throw new Error('Area name already exists');

      // Save to database given area coordinates and return
      const area = this.areasRepository.create(createAreaDto);
      return await this.areasRepository.save(area);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Returns all areas in the database
   * */
  async findAll() {
    try {
      return await this.areasRepository.find();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Returns an area by it's id
   * @param id
   * */
  async findById(id: string) {
    try {
      return this.areasRepository.findOneBy({ id });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Creates custom determined locations to the database
   * @param name
   * */
  async addCustomLocations() {
    try {
      // read the taksim JSON file
      const taksimData = fs.readFileSync('libs/shared/Locations/taksim.json', 'utf-8');
      const taksimCoordinates: number[][] = JSON.parse(taksimData);
      const taksimRaw = await this.create({
        polygon: taksimCoordinates,
        name: 'Taksim',
      });
      this.areasRepository.save(taksimRaw);

      // read the umraniye JSON file
      const umraniyeData = fs.readFileSync('libs/shared/Locations/kadikoy.json', 'utf-8');
      const umraniyeCoordinates: number[][] = JSON.parse(umraniyeData);
      const umraniyeRaw = await this.create({
        polygon: umraniyeCoordinates,
        name: 'Kadikoy',
      });
      this.areasRepository.save(umraniyeRaw);
      return true;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
