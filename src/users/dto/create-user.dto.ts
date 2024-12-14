import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'id must be a string' })
  @IsNotEmpty({ message: 'id is required' })
  id: string;

  @IsString({ message: 'username must be a string' })
  @IsNotEmpty({ message: 'username is required' })
  username: string;

  @IsString({ message: 'description must be a string' })
  description?: string;

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
