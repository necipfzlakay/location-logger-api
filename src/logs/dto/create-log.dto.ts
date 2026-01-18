import { IsNotEmpty, IsString, } from 'class-validator';

export class CreateNewLogDto {
  @IsString({ message: 'user_id must be a string' })
  @IsNotEmpty({ message: 'user_id is required' })
  user_id: string;

  @IsString({ message: 'area_id must be a string' })
  @IsNotEmpty({ message: 'area_id is required' })
  area_id: string;

  @IsNotEmpty({ message: 'long is required' })
  long: number;

  @IsNotEmpty({ message: 'lat is required' })
  lat: number;

  description?: string;
}
