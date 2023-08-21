import { Module } from '@nestjs/common';
import { PasswordsService } from './passwords.service';

@Module({
    imports: [],
        controllers: [],
        providers: [PasswordsService],
        exports: [PasswordsService],
    })
    export class PasswordsModule {}
