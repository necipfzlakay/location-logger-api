import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetUsersLocationDto {
  @IsString({ message: 'user_id must be a string' })
  @IsNotEmpty({ message: 'user_id is required' })
  user_id: string;

  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'longitude must be a number' },
  )
  long?: number;

  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'latitude must be a number' },
  )
  lat?: number;
}
