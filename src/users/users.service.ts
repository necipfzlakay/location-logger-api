import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    try {
      const userByUsername = await this.findByUsername(createUserDto.username);
      if (userByUsername) throw new Error('User already exists');

      const newUser = this.usersRepository.create(createUserDto);
      return await this.usersRepository.save(newUser);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findById(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    return user;
  }

  async findByUsername(username: string) {
    const user = await this.usersRepository.findOneBy({ username });
    return user;
  }
  async findOne(id: string) {
    try {
      const user = await this.findById(id);
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
