import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  // @IsString({ message: 'id must be a string' })
  // @IsNotEmpty({ message: 'id is required' })
  // id: string;

  @ApiProperty({ example: 'test_user', description: 'The username of the user' })
  @IsString({ message: 'username must be a string' })
  @IsNotEmpty({ message: 'username is required' })
  username: string;
}
