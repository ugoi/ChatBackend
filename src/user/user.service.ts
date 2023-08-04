import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async createUser(user: Partial<User>): Promise<User> {
    return await this.usersRepository.save(user);
  }

  async findUserByUsername(username: string): Promise<User> {
    return await this.usersRepository.findOne({ where: { username } });
  }
}
