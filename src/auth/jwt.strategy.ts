import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, RequestUser } from './auth.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private jwtService: JwtService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([(request) => {
                return request?.cookies?.quantum_chat_auth_token;
            }]),
            ignoreExpiration: false,
            secretOrKey: 'SECRET_KEY', // Replace with your secret or fetch from config/environment
        });
    }

    async validate(payload: JwtPayload): Promise<RequestUser> {
        return { userId: payload.sub, username: payload.username };
    }
}
