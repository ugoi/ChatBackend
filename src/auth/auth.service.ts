import { Injectable, UnauthorizedException, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RequestUser } from './auth.types';
import { ValidationResult } from 'src/chat/passwords/passwords.types';
import { PasswordsService } from 'src/chat/passwords/passwords.service';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly passwordsService: PasswordsService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<{message: string}> {
    const validationResults: ValidationResult = this.passwordsService.validatePassword(createUserDto.password);

    if (!validationResults.isValid) {
        // Ensure that errors exist before joining them
        const errorMessage = validationResults.errors && validationResults.errors.length ? 
        validationResults.errors.join(', ') : 
        'Unknown error';
    
        throw new BadRequestException(`Password validation failed due to: ${errorMessage}`);
    }
    
    const existingUser = await this.userService.findUserByUsername(createUserDto.username);
    if (existingUser) {
      throw new HttpException({
        status: "error",
        error: 'User with this username already exists',
      }, HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    await this.userService.createUser({
      ...createUserDto,
      hashedPassword: hashedPassword,
    });

    return { message: 'User registration successful' };
  }

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findUserByUsername(username);
    if (user && await bcrypt.compare(password, user.hashedPassword)) {
      return user; // Return user details without sensitive data
    }
    return null;
  }


  async login(user: User): Promise<{ access_token: string }> {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  
}
