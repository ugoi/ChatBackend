import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { ChatJwtPayload, ChatRequestUser } from './chat-auth.types';
import { ConfigService } from '@nestjs/config';
import { AuthConfig } from 'config/types';

@Injectable()
export class ChatJwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService<{auth: AuthConfig}>) {

        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(request) => {
                return request?.cookies?.quantum_chat_auth_token;
            }]),
            ignoreExpiration: false,
            secretOrKey: configService.get('auth.jwt.secret', { infer: true }),
        });
    }

    async validate(payload: ChatJwtPayload): Promise<ChatRequestUser> {
        return { userId: payload.sub, username: payload.username };
    }
}
