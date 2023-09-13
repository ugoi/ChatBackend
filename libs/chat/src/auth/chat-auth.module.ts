import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ChatAuthService } from './chat-auth.service';
import { ChatAuthController } from './chat-auth.controller';
import { ChatJwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { PasswordsModule } from 'src/passwords/passwords.module';
import { MemberModule } from '../members/members.module';
import { ChatConfiguredJwtModule } from './chat-configured-jwt.module';

@Module({
  imports: [
    forwardRef(() => MemberModule),
    PassportModule,
    ChatConfiguredJwtModule,
    PasswordsModule,
    ConfigModule
  ],
  controllers: [ChatAuthController],
  providers: [ChatAuthService, ChatJwtStrategy],
  exports: [ChatAuthService]
})
export class ChatAuthModule {}

