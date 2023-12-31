import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { GroupChannel } from '../../group-channels/entities/group-channel.entity';
import { Member } from '../../members/entities/member.entity';

@Entity('messages')
export class Message {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    content: string;

    @ManyToOne(type => GroupChannel, channel => channel.messages)
    channel: GroupChannel;

    @ManyToOne(type => Member, { eager: true })  // The { eager: true } option auto-loads the member whenever a message is loaded.
    author: Member;
}
