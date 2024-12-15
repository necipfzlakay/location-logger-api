import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateAreaDto {
  name?: string;

  // polygon?: number[][];
  @IsNotEmpty({ message: 'polygon is required' })
  @IsArray({ message: 'polygon must be an array' })
  polygon?: any;
}
