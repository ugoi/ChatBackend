import { Module } from '@nestjs/common';
import { ChatPasswordsService } from './chat-passwords.service';

@Module({
    imports: [],
    controllers: [],
    providers: [ChatPasswordsService],
    exports: [ChatPasswordsService],
    })
    export class ChatPasswordsModule {}
