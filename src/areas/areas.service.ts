import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import { Repository } from 'typeorm';
import { CreateAreaDto } from './dto/create-area.dto';
import { Areas } from './entities/area.entity';

@Injectable()
export class AreasService implements OnModuleInit {
  // In-memory cache for areas to avoid DB hits on every location check
  private areasCache: Areas[] = [];

  constructor(
    @InjectRepository(Areas)
    private readonly areasRepository: Repository<Areas>,
  ) { }

  /**
   * Load all areas into cache when the module initializes
   */
  async onModuleInit() {
    console.log('AreasService: onModuleInit');
    await this.addCustomLocations();
    await this.refreshCache();
  }

  /**
   * Refreshes the in-memory cache from the database
   */
  async refreshCache() {
    this.areasCache = await this.areasRepository.find();
    console.log(`Areas cache refreshed. Total areas: ${this.areasCache.length}`);
  }

  /**
   * Returns areas from in-memory cache
   */
  getCachedAreas() {
    return this.areasCache;
  }

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
      const existingArea = await this.areasRepository.findOneBy({
        name: createAreaDto.name,
      });

      if (existingArea) throw new Error('Area name already exists');

      // Save to database given area coordinates
      const area = this.areasRepository.create(createAreaDto);
      const savedArea = await this.areasRepository.save(area);

      // Update cache
      this.areasCache.push(savedArea);

      return savedArea;
    } catch (error) {
      if (error.message === 'Area name already exists') {
        throw new BadRequestException("Already Exists");
      }
      throw new BadRequestException(error.message);
    }
  }

  /**
   * Returns all areas in the database
   * */
  async findAll() {
    try {
      await this.refreshCache();
      return this.areasCache;
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
      // Check if exists to avoid error during custom seeding
      const taksimExists = await this.areasRepository.findOneBy({ name: 'Taksim' });
      if (!taksimExists) {
        await this.create({
          polygon: taksimCoordinates,
          name: 'Taksim',
        });
      }

      // read the kadikoy JSON file
      const kadikoyData = fs.readFileSync('libs/shared/Locations/kadikoy.json', 'utf-8');
      const kadikoyCoordinates: number[][] = JSON.parse(kadikoyData);
      const kadikoyExists = await this.areasRepository.findOneBy({ name: 'Kadikoy' });
      if (!kadikoyExists) {
        await this.create({
          polygon: kadikoyCoordinates,
          name: 'Kadikoy',
        });
      }
      this.refreshCache();
      return true;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
