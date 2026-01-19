import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetUsersLocationDto {
  @ApiProperty({ example: 'user-uuid-1234', description: 'The UUID of the user' })
  @IsString({ message: 'user_id must be a string' })
  @IsNotEmpty({ message: 'user_id is required' })
  user_id: string;

  // @IsNotEmpty({ message: 'long is required' })
  @ApiProperty({ example: 28.9784, description: 'Longitude' })
  long: number;

  // @IsNotEmpty({ message: 'lat is required' })
  @ApiProperty({ example: 41.0082, description: 'Latitude' })
  lat: number;
}
