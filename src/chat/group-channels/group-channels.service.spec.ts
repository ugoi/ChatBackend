import { Test, TestingModule } from '@nestjs/testing';
import { GroupChannelsService } from './group-channels.service';
import { Repository } from 'typeorm';
import { GroupChannel } from './entities/group-channel.entity';
import { ChatPasswordsService } from '../chat-passwords/chat-passwords.service';

describe('GroupChannelsService', () => {
  let service: GroupChannelsService;
  let mockGroupChannelRepository: Partial<Repository<GroupChannel>>;
  let mockPasswordsService: Partial<ChatPasswordsService>;

  beforeEach(async () => {
    // 1. Mock GroupChannelRepository methods
    mockGroupChannelRepository = {
      save: jest.fn().mockResolvedValue({}),
      // Add other methods if used in the service
    };

    // 2. Mock ChatPasswordsService methods
    mockPasswordsService = {
      validatePassword: jest.fn().mockReturnValue({
        isValid: true,
        errors: []
      }),
      hashPassword: jest.fn().mockResolvedValue("hashedPassword"),
      // Add other methods if used in the service
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupChannelsService,
        // Provide the mocked repositories and services
        {
          provide: 'GroupChannelRepository',
          useValue: mockGroupChannelRepository,
        },
        {
          provide: ChatPasswordsService,
          useValue: mockPasswordsService,
        },
      ],
    }).compile();

    service = module.get<GroupChannelsService>(GroupChannelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // ... you can then add more tests to test the service methods
});
