import { Test, TestingModule } from '@nestjs/testing';
import { GroupChannelsController } from './group-channels.controller';

describe('GroupChannelsController', () => {
  let controller: GroupChannelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupChannelsController],
    }).compile();

    controller = module.get<GroupChannelsController>(GroupChannelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
