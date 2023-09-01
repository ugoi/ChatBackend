import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from 'src/chat/members/entities/member.entity';
import { Message } from './entities/message.entity';
import { GroupChannel } from '../group-channels/entities/group-channel.entity';

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message) private messageRepository: Repository<Message>,
        @InjectRepository(GroupChannel) private channelRepository: Repository<GroupChannel>,
        @InjectRepository(Member) private memberRepository: Repository<Member>,
    ) {}

    async createMessage(channelId: string, content: string, authorId: string): Promise<Message> {
        const channel = await this.channelRepository.findOne({ where: { id: channelId } });
        if (!channel) {
            throw new NotFoundException('GroupChannel not found');
        }

        const author = await this.memberRepository.findOne({ where: { id: authorId } });
        if (!author) {
            throw new NotFoundException('Author not found');
        }

        const newMessage = this.messageRepository.create({
            content,
            channel,
            author,
        });

        return this.messageRepository.save(newMessage);
    }

    async deleteMessage(messageId: string): Promise<void> {
        const result = await this.messageRepository.delete(messageId);

        if (result.affected === 0) {
            throw new NotFoundException('Message not found');
        }
    }
}
