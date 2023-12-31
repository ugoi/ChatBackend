import { GroupChannel } from '../../group-channels/entities/group-channel.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('members')
export class Member {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ type: 'boolean', default: false })
  isBot: boolean;

  @ManyToMany(type => GroupChannel, channel => channel.members)
  channels: GroupChannel[];
}
