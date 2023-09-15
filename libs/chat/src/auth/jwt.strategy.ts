import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ChatJwtPayload, ChatRequestUser } from './chat-auth.types';
import { ChatModuleOptions } from '../chat.types';

@Injectable()
export class ChatJwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject('CHAT_AUTH_MODULE_OPTIONS') private readonly chatAuthOptions: ChatModuleOptions
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(request) => {
                return request?.cookies?.quantum_chat_auth_token;
            }]),
            ignoreExpiration: false,
            secretOrKey: chatAuthOptions.jwt.secret,  // <-- use secret from options
        });
    }

    async validate(payload: ChatJwtPayload): Promise<ChatRequestUser> {
        return { userId: payload.sub, username: payload.username };
    }
}