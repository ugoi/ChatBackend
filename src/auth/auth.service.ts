import { Injectable, UnauthorizedException, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateMemberDto } from './dto/create-user.dto';
import { LoginMemberDto } from './dto/login-user.dto';
import { MemberService } from '../chat/member/member.service';
import { Member } from '../chat/member/entities/member.entity';
import * as bcrypt from 'bcryptjs';
import { RequestUser } from './auth.types';
import { ValidationResult } from 'src/chat/passwords/passwords.types';
import { PasswordsService } from 'src/chat/passwords/passwords.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly memberService: MemberService,
    private readonly jwtService: JwtService,
    private readonly passwordsService: PasswordsService,
  ) {}

  async register(createMemberDto: CreateMemberDto): Promise<{message: string}> {
    const validationResults: ValidationResult = this.passwordsService.validatePassword(createMemberDto.password);
    console.log(validationResults.errors);


    if (!validationResults.isValid) {
        // Ensure that errors exist before joining them
        const errorMessage = validationResults.errors && validationResults.errors.length ? 
        validationResults.errors.join(', ') : 
        'Unknown error';
    
        throw new BadRequestException(`Password validation failed due to: ${errorMessage}`);
    }
    
    const existingMember = await this.memberService.findMemberByMembername(createMemberDto.username);
    if (existingMember) {
      throw new HttpException({
        status: "error",
        error: 'Member with this username already exists',
      }, HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(createMemberDto.password, 10);
    await this.memberService.createMember({
      ...createMemberDto,
      hashedPassword: hashedPassword,
    });

    return { message: 'Member registration successful' };
  }

  async validateUser(username: string, password: string): Promise<Member> {
    const user = await this.memberService.findMemberByMembername(username);
    if (user && await bcrypt.compare(password, user.hashedPassword)) {
      return user; // Return user details without sensitive data
    }
    return null;
  }


  async login(user: Member): Promise<{ access_token: string }> {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  
}
