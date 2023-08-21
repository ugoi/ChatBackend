//... (import statements)
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { GroupChannel } from './entities/group-channel.entity';
import { PasswordsService } from '../passwords/passwords.service';
import { ValidationResult } from '../passwords/passwords.types';

@Injectable()
export class GroupChannelsService {
    constructor(
        @InjectRepository(GroupChannel)
        private groupChannelRepository: Repository<GroupChannel>,
        private readonly passwordsService: PasswordsService
    ) {}

    async createGroupChannel(title: string, isPublic: boolean, password?: string): Promise<GroupChannel> {
        const groupChannel = new GroupChannel();
        groupChannel.title = title;
        groupChannel.isPublic = isPublic;

        if (password) {
            const validationResults: ValidationResult = this.passwordsService.validatePassword(password);

            if (!validationResults.isValid) {
                // Ensure that errors exist before joining them
                const errorMessage = validationResults.errors?.join(', ') ?? 'Unknown error';
                throw new BadRequestException(`Password validation failed due to: ${errorMessage}`);
            }
    
            groupChannel.hashedPassword = await this.passwordsService.hashPassword(password);
        }

        return await this.groupChannelRepository.save(groupChannel);
    }
}
