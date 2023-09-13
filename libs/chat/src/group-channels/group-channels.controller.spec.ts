import { Test, TestingModule } from '@nestjs/testing';
import { GroupChannelsController } from './group-channels.controller';
import { GroupChannelsService } from './group-channels.service';

const mockGroupChannelsService = {
  // mock methods and properties as needed
  createGroupChannel: jest.fn(),
  // ... other methods if they exist in the service
};

describe('GroupChannelsController', () => {
  let controller: GroupChannelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupChannelsController],
      providers: [
        {
          provide: GroupChannelsService,
          useValue: mockGroupChannelsService, // Use the mock instead of the real service
        },
      ],
    }).compile();

    controller = module.get<GroupChannelsController>(GroupChannelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
