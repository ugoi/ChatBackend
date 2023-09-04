import { Test, TestingModule } from '@nestjs/testing';
import { ChatAuthService } from './chat-auth.service';

describe('ChatAuthService', () => {
  let service: ChatAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatAuthService],
    }).compile();

    service = module.get<ChatAuthService>(ChatAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
