import { Test, TestingModule } from '@nestjs/testing';
import { GroupChannelsService } from './group-channels.service';

describe('GroupChannelsService', () => {
  let service: GroupChannelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupChannelsService],
    }).compile();

    service = module.get<GroupChannelsService>(GroupChannelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
