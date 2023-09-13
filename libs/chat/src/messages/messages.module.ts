import { Module } from '@nestjs/common';
import { MessageService } from './messages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Member } from '../members/entities/member.entity';
import { GroupChannel } from '../group-channels/entities/group-channel.entity';
import { MessagesController } from './messages.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Message, GroupChannel, Member])],
  controllers: [MessagesController],
  providers: [MessageService],
  exports: [MessageService]
})
export class MessageModule {}

