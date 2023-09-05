import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ChatJwtPayload } from './chat-auth.types';
import { Member } from '../members/entities/member.entity';


@Injectable()
export class ChatAuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async issueToken(user: Member): Promise<{ access_token: string }> {
    const payload: ChatJwtPayload = { username: user.username, sub: user.id.toString() }; 
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
