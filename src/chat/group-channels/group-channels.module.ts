import { Module } from '@nestjs/common';
import { GroupChannelsController } from './group-channels.controller';
import { GroupChannelsService } from './group-channels.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { GroupChannel } from './entities/group-channel.entity';
import { PasswordsModule } from '../passwords/passwords.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupChannel]),
    PasswordsModule
  ],
  controllers: [GroupChannelsController],
  providers: [GroupChannelsService]
})
export class GroupChannelsModule {}

