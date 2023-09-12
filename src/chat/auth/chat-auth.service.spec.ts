import { Test, TestingModule } from '@nestjs/testing';
import { ChatAuthService } from './chat-auth.service';
import { JwtService } from '@nestjs/jwt';

// 1. Create a mock for the JwtService
const mockJwtService = {
  sign: jest.fn(() => 'mockToken'),
};

describe('ChatAuthService', () => {
  let service: ChatAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatAuthService,
        // 2. Use the mock in your testing module
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<ChatAuthService>(ChatAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
