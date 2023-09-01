import { Module } from '@nestjs/common';
import { GroupChannelsController } from './group-channels.controller';
import { GroupChannelsService } from './group-channels.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GroupChannel } from './entities/group-channel.entity';
import { ChatPasswordsModule } from '../chat-passwords/chat-passwords.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupChannel]),
    ChatPasswordsModule
  ],
  controllers: [GroupChannelsController],
  providers: [GroupChannelsService]
})
export class GroupChannelsModule {}

