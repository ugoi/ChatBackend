import { Test, TestingModule } from '@nestjs/testing';
import { MemberService } from './members.service';
import { Repository } from 'typeorm';
import { Member } from './entities/member.entity';

describe('MemberService', () => {
  let service: MemberService;
  let mockMemberRepository: Partial<Repository<Member>>;

  beforeEach(async () => {
    mockMemberRepository = {
      find: jest.fn().mockResolvedValue([]), // mock implementation as needed
      save: jest.fn().mockResolvedValue({}),
      findOne: jest.fn().mockResolvedValue({}),
      // ... add any other methods of the repository that are used in the service
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MemberService,
        {
          provide: 'MemberRepository', // Use the InjectionToken used for the Member Repository. Often it's the name of the entity or the name you provided in @Entity('name') decorator.
          useValue: mockMemberRepository,
        },
      ],
    }).compile();

    service = module.get<MemberService>(MemberService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // ... you can then add more tests to test the service methods
});
