import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  /**
   * Create a new user
   * @param createUserDto
   */
  async createUser(createUserDto: CreateUserDto) {
    try {
      const userByUsername = await this.findByUsername(createUserDto.username);
      if (userByUsername) throw new Error('User already exists');
      const newUser = this.usersRepository.create(createUserDto);
      return await this.usersRepository.save(newUser);
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  /**
   *  Find a user by id
   * @param id
   */
  async findById(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    return user;
  }

  /**
   *  Find a user by username
   * @param username
   */
  async findByUsername(username: string) {
    const user = await this.usersRepository.findOneBy({ username });
    return user;
  }

  /**
   *  Get all users
   */
  async findAll() {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  /**
   *  Get a user by id
   * @param id
   */
  async findOne(id: string) {
    try {
      return await this.findById(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
