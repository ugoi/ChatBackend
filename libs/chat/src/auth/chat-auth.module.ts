import { DynamicModule, Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ChatAuthService } from './chat-auth.service';
import { ChatAuthController } from './chat-auth.controller';
import { ChatJwtStrategy } from './jwt.strategy';
import { MemberModule } from '../members/members.module';
import { ChatModuleAsyncOptions, ChatModuleOptions } from '../chat.types';
import { JwtModule } from '@nestjs/jwt'; // <-- Make sure JwtService is imported
import { PasswordsModule } from '../../../../src/passwords/passwords.module';

@Module({})
export class ChatAuthModule {
  static forRoot(options: ChatModuleOptions): DynamicModule {
    const jwtConfig = {
      secret: options.jwt.secret,
      signOptions: {
        expiresIn: options.jwt.expirationTime
      }
    };
    
    const imports = [
      ...options.imports,
      MemberModule,
      PassportModule,
      PasswordsModule,
      JwtModule.register(jwtConfig)
    ];

    return {
      module: ChatAuthModule,
      imports: imports,
      controllers: [ChatAuthController],
      providers: [
        ChatAuthService, 
        ChatJwtStrategy,
        {
          provide: 'CHAT_MODULE_OPTIONS',
          useValue: options,
        }
      ],
      exports: [ChatAuthService, ChatJwtStrategy] 

    };
  }

  static forRootAsync(options: ChatModuleAsyncOptions): DynamicModule {
    const imports = [
      ...options.imports,
      MemberModule,
      PassportModule,
      PasswordsModule,
      JwtModule.registerAsync({
        imports: options.imports || [],
        useFactory: async (...args: any[]) => {
          const chatOptions: ChatModuleOptions = await options.useFactory(...args);
            return {
                secret: chatOptions.jwt.secret,
                signOptions: { 
                    expiresIn: chatOptions.jwt.expirationTime
                },
            }
        },
        inject: options.inject || [],
    }),
  ];
    return {
      module: ChatAuthModule,
      imports: imports,
      controllers: [ChatAuthController],
      providers: [
        ChatAuthService, 
        ChatJwtStrategy,
        {
          provide: 'CHAT_AUTH_MODULE_OPTIONS',
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
      ],
      exports: [ChatAuthService, ChatJwtStrategy]
    };
  }
}
