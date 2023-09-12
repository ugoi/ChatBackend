import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { PasswordsService } from '../passwords/passwords.service';

const mockUserService = {
  findUserByUsername: jest.fn(),
  createUser: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn(),
};

const mockPasswordsService = {
  validatePassword: jest.fn(),
};


describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUserService },  // mock UserService
        { provide: JwtService, useValue: mockJwtService },    // mock JwtService
        { provide: PasswordsService, useValue: mockPasswordsService },  // mock PasswordsService
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
