// Import necessary modules
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

// Mock services
const mockAuthService = {
  register: jest.fn(),
  login: jest.fn(),
};

const mockUserService = {};

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: UserService, useValue: mockUserService },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Add more tests as needed
  // e.g.,
  // it('should call the register method of AuthService', async () => {
  //   const createUserDto = { ... }; // some data
  //   await controller.register(createUserDto, {});
  //   expect(mockAuthService.register).toHaveBeenCalledWith(createUserDto);
  // });
});
