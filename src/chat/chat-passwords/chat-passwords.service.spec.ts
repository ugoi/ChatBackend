import { Test, TestingModule } from '@nestjs/testing';
import { ChatPasswordsService } from './chat-passwords.service';

describe('ChatPasswordsService', () => {
  let service: ChatPasswordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatPasswordsService],
    }).compile();

    service = module.get<ChatPasswordsService>(ChatPasswordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
