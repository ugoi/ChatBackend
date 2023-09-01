import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfiguredJwtModule } from 'src/auth/configured-jwt.module';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { PasswordsModule } from 'src/passwords/passwords.module';
import { User } from 'src/user/entities/user.entity';

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

