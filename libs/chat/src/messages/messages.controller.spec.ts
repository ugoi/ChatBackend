import { Test, TestingModule } from '@nestjs/testing';
import { MessagesController } from './messages.controller';
import { MessageService } from './messages.service';

const mockMessageService = {
  // mock methods and properties as needed
  createMessage: jest.fn(),
  deleteMessage: jest.fn(),
  // ... other methods
};

describe('MessagesController', () => {
  let controller: MessagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessagesController],
      providers: [
        {
          provide: MessageService,
          useValue: mockMessageService, // Use the mock instead of the real service
        },
      ],
    }).compile();

    controller = module.get<MessagesController>(MessagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
