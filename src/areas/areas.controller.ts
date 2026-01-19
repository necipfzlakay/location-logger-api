import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AreasService } from './areas.service';
import { CreateAreaDto } from './dto/create-area.dto';

@ApiTags('areas')
@Controller('areas')
export class AreasController {
  constructor(private readonly areasService: AreasService) { }

  /**
   *  Creates an area with given coordinates
   *  @param createAreaDto
   * */
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Test Area' },
        polygon: {
          type: 'array',
          items: {
            type: 'array',
            items: { type: 'number' }
          },
          example: [
            [28.973, 41.011],
            [28.980, 41.011],
            [28.980, 41.005],
            [28.973, 41.005],
            [28.973, 41.011]
          ]
        }
      }
    },
    examples: {
      'Test Area': {
        summary: 'A simple rectangular area',
        description: 'A small rectangular area somewhere in Istanbul',
        value: {
          name: 'Test Area',
          polygon: [
            [28.973, 41.011],
            [28.980, 41.011],
            [28.980, 41.005],
            [28.973, 41.005],
            [28.973, 41.011]
          ]
        }
      }
    }
  })
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
