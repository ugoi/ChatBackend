import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<{message: string}> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    await this.userService.createUser({
      ...createUserDto,
      password: hashedPassword,
    });

    return { message: 'User registration successful' };
  }


  async login(loginUserDto: LoginUserDto): Promise<{ access_token: string }> {
    const user = await this.userService.findUserByUsername(loginUserDto.username);

    if (!user || !await bcrypt.compare(loginUserDto.password, user.password)) {
      throw new UnauthorizedException();
    }

    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
