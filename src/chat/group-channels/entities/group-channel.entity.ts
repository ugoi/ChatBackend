import { Entity, Column, OneToMany, ManyToMany, JoinTable, PrimaryGeneratedColumn } from 'typeorm';
import { Message } from '../../messages/entities/message.entity';
import { Member } from 'src/chat/member/entities/member.entity';

@Entity('group_channel')
export class GroupChannel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', nullable: true })
    title: string;

    @Column({ type: 'boolean', default: false }) 
    isDistinct: boolean;

    @Column({ type: 'boolean', default: false })
    isPublic: boolean;

    @Column({ type: 'varchar', nullable: true })
    hashedPassword: string;  // stores the hashed version of the password

    @OneToMany(type => Message, message => message.channel)
    messages: Message[];

    @ManyToMany(type => Member)
    @JoinTable({ name: 'channel_members' })  // specifies the name of the table that will be created to store the relationship
    members: Member[];
}
