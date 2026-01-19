import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateAreaDto {
  @ApiProperty({ example: 'Central Park', description: 'Name of the area' })
  @IsString()
  @IsNotEmpty()
  name: string;

  // polygon?: number[][];
  @ApiProperty({
    example: [
      [28.973, 41.011],
      [28.980, 41.011],
      [28.980, 41.005],
      [28.973, 41.005],
      [28.973, 41.011]
    ],
    description: 'Array of coordinates [longitude, latitude] defining the polygon',
    type: 'array',
    items: {
      type: 'array',
      items: {
        type: 'number'
      }
    }
  })
  @IsNotEmpty({ message: 'polygon is required' })
  @IsArray({ message: 'polygon must be an array' })
  polygon: Array<number[]>
}
