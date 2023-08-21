import { IsString, IsNotEmpty } from 'class-validator';

export class CreateMemberDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}
