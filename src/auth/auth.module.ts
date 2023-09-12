import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { ConfigModule } from '@nestjs/config';
import { User } from '../user/entities/user.entity';
import { PasswordsModule } from '../passwords/passwords.module';
import { UserModule } from '../user/user.module';
import { ConfiguredJwtModule } from './configured-jwt.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    ConfiguredJwtModule,
    TypeOrmModule.forFeature([User]),
    PasswordsModule,
    ConfigModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  exports: [AuthService]
})
export class AuthModule {}

