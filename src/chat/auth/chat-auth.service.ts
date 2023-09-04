import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { PasswordsService } from 'src/passwords/passwords.service';
import { ChatJwtPayload } from './chat-auth.types';
import { Member } from '../members/entities/member.entity';


@Injectable()
export class ChatAuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findUserByUsername(username);
    if (user && await bcrypt.compare(password, user.hashedPassword)) {
      return user; // Return user details without sensitive data
    }
    return null;
  }

  async issueToken(user: Member): Promise<{ access_token: string }> {
    const payload: ChatJwtPayload = { username: user.username, sub: user.id.toString() }; 
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

