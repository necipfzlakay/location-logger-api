import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAreaDto {
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'longitude must be a number' },
  )
  @IsNotEmpty({ message: 'longitude is required' })
  long?: number;

  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'latitude must be a number' },
  )
  @IsNotEmpty({ message: 'latitude is required' })
  lat?: number;

  name?: string;

  // polygon?: number[][];
  polygon?: any;
}
