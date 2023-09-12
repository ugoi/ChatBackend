import { Test, TestingModule } from '@nestjs/testing';
import { MessagesController } from './messages.controller';
import { MessageService } from './messages.service';

describe('MessagesController', () => {
  let controller: MessagesController;
  let mockMessageService: Partial<MessageService>;

  beforeEach(async () => {
    mockMessageService = {
      createMessage: jest.fn().mockResolvedValue({}),
      deleteMessage: jest.fn().mockResolvedValue({}),
      // ... add any other methods of the service that are used in the controller
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessagesController],
      providers: [
        {
          provide: MessageService,
          useValue: mockMessageService
        }
      ],
    }).compile();

    controller = module.get<MessagesController>(MessagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // ... you can then add more tests to test the controller methods
});
