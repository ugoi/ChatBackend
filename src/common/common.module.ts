import { Module } from '@nestjs/common';
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthConfig } from 'config/types';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService<{ auth: AuthConfig }>) => {
                const authConfig = configService.get<AuthConfig>('auth');
                
                return {
                    secret: authConfig.jwt.secret,
                    signOptions: { 
                        expiresIn: authConfig.jwt.expirationTime 
                    },
                }
            },
            inject: [ConfigService],
        }),
    ],
    exports: [
        JwtModule
    ]
})
export class CommonModule {}
