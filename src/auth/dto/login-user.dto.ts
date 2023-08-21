import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginMemberDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  password: string;
}
