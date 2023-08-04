import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
    ) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    let existingUser;
    try {
      existingUser = await this.userService.findUserByUsername(createUserDto.username);
    } catch (error) {
        console.log(error);
        throw new HttpException({
          status: HttpStatus.BAD_REQUEST,
          error: 'FindUserByUsername failed',
        }, HttpStatus.BAD_REQUEST, {
          cause: error
        });
    }

    if (existingUser) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'User with this username already exists',
      }, HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.authService.register(createUserDto);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Registration failed',
      }, HttpStatus.BAD_REQUEST, {
        cause: error
      });
    }
  }
  

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      console.log("Login");
      return await this.authService.login(loginUserDto);
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.UNAUTHORIZED,
        error: 'Login failed',
      }, HttpStatus.UNAUTHORIZED, {
        cause: error
      });
    }
  }
  
}
