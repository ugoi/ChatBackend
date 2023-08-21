import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { MessageModule } from './messages/messages.module';
import { BotsModule } from './bots/bots.module';
import { GroupChannelsModule } from './group-channels/group-channels.module';
import { PasswordsService } from './passwords/passwords.service';
import { PasswordsModule } from './passwords/passwords.module';

@Module({
  controllers: [ChatController],
  providers: [ChatService, PasswordsService],
  exports: [ChatService],
  imports: [MessageModule, GroupChannelsModule, BotsModule, PasswordsModule]
})
export class ChatModule {}
