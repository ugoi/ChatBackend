import { Test, TestingModule } from '@nestjs/testing';
import { ChatAuthController } from './chat-auth.controller';

describe('ChatAuthController', () => {
  let controller: ChatAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatAuthController],
    }).compile();

    controller = module.get<ChatAuthController>(ChatAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
