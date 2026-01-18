import { Body, Controller, Get, Post } from '@nestjs/common';
import { AreasService } from './areas.service';
import { CreateAreaDto } from './dto/create-area.dto';

@Controller('areas')
export class AreasController {
  constructor(private readonly areasService: AreasService) { }

  /**
   *  Creates an area with given coordinates
   *  @param createAreaDto
   * */
  @Post()
  create(@Body() createAreaDto: CreateAreaDto) {
    return this.areasService.create(createAreaDto);
  }

  /**
   * Returns all areas in the database
   * */
  @Get()
  findAll() {
    return this.areasService.findAll();
  }

  /**
   * Creates custom locations for testing purposes
   * */
  @Get('custom')
  addCustomLocations() {
    return this.areasService.addCustomLocations();
  }
}
