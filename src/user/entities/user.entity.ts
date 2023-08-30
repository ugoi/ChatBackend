import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ type: 'varchar', nullable: true })
  hashedPassword: string;

  @Column({ type: 'boolean', default: false })
  isBot: boolean;
}
