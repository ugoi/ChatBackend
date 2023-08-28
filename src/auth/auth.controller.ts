import { Body, Controller, HttpException, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateMemberDto } from './dto/create-user.dto';
import { MemberService } from 'src/chat/member/member.service';
import { Response } from 'express';
import { GetUser } from 'src/decorators/get-user/get-user.decorator';
import { Member } from 'src/chat/member/entities/member.entity';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly memberService: MemberService
    ) {}


  @Post('register')
  async register(@Body() createMemberDto: CreateMemberDto, @Res() res: Response) {
      const result = await this.authService.register(createMemberDto);
      return res.status(HttpStatus.CREATED).send({ status: 'success', data: result });
  }
  
  
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    // @Body() loginMemberDto: LoginMemberDto,
    @Res() res: Response,
    @GetUser() user: Member,
    ) {
    try {
      const { access_token } = await this.authService.login(user);

      res.cookie('quantum_chat_auth_token', access_token, {
        httpOnly: true,
        // secure: true, // Use this in a HTTPS environment
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        // domain: 'your-domain.com', 
        // path: '/',
      });
  
      return res.status(HttpStatus.OK).send({ status: 'success' });

    } catch (error) {
      throw new HttpException({
        status: "error",
        error: 'Login failed',
      }, HttpStatus.UNAUTHORIZED, {
        cause: error
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Res() response: Response) {
    response.clearCookie('quantum_chat_auth_token', {
        // If you set these attributes when setting the cookie, include them:
        // path: '/',
        // domain: '.yourdomain.com',
    });
    return response.status(HttpStatus.OK).json({ status: 'success', message: 'Logged out successfully' });
  }
}
