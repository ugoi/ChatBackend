import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MemberService } from '../chat/member/member.service';
import { MemberModule } from 'src/chat/member/member.module';
import { Member } from 'src/chat/member/entities/member.entity';
import { CommonModule } from 'src/common/common.module';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { PasswordsModule } from 'src/chat/passwords/passwords.module';

@Module({
  imports: [
    forwardRef(() => MemberModule),
    PassportModule,
    CommonModule,
    TypeOrmModule.forFeature([Member]),
    PasswordsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  exports: [AuthService]
})
export class AuthModule {}

