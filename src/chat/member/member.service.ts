import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './entities/member.entity';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private membersRepository: Repository<Member>,
  ) {}

  findAll(): Promise<Member[]> {
    return this.membersRepository.find();
  }

  async createMember(member: Partial<Member>): Promise<Member> {
    return await this.membersRepository.save(member);
  }

  async findMemberByMembername(username: string): Promise<Member> {
    return await this.membersRepository.findOne({ where: { username } });
  }
}
