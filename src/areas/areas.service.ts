import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { Repository } from 'typeorm';
import { Areas } from './entities/area.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';

@Injectable()
export class AreasService {
  constructor(
    @InjectRepository(Areas)
    private readonly areasRepository: Repository<Areas>,
  ) {}
  async create(createAreaDto: CreateAreaDto) {
    try {
      if (createAreaDto.long < -180 || createAreaDto.long > 180)
        throw Error('longitude must be between -180 and 180');
      if (createAreaDto.lat < -90 || createAreaDto.lat > 90)
        throw Error('latitude must be between -90 and 90');

      // Save to database
      const area = this.areasRepository.create(createAreaDto);
      return await this.areasRepository.save(area);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      return await this.areasRepository.find();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findById(id: string) {
    try {
      return this.areasRepository.findOneBy({ id });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async addCustomLocations() {
    try {
      // JSON dosyasını okuyun
      const rawData = fs.readFileSync('src/common/taksim.json', 'utf-8');
      const rawCoordinates: number[][] = JSON.parse(rawData);
      // // JSON verisini Point formatına dönüştürün
      // const polygon: Point[] = rawCoordinates.map(([long, lat]) => ({
      //   long,
      //   lat,
      // }));
      console.log(rawCoordinates);
      this.create({ polygon: rawCoordinates, name: 'Taksim' });

      // console.log(polygon);
      // return polygon;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
