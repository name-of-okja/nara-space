import { plainToInstance } from 'class-transformer';
import { CreateMemberDto } from './dto/create-member.dto';
import { GetMembersFilterDto } from './dto/get-members-filter.dto';
import { MemberRepository } from './member.repository';
import { Member } from '../../entity';
import { BadRequestException } from '../../libs/common';
import { FindOptionsWhere } from 'typeorm';

export class MemberService {
  constructor(private readonly memberRepository = new MemberRepository()) {}

  async findOneByKey(where: FindOptionsWhere<Member>) {
    return this.memberRepository.findOne(where, { scores: true });
  }

  async findByFilter(filter: GetMembersFilterDto) {
    return this.memberRepository.findByFilter(filter);
  }

  async create(payload: CreateMemberDto) {
    if (await this.memberRepository.validationNickname(payload.nickname)) {
      throw new BadRequestException(`nickname is exist`);
    }

    const member = plainToInstance(Member, payload, {
      excludeExtraneousValues: true,
    });

    return this.memberRepository.create(member);
  }

  async deleteByKey(where: FindOptionsWhere<Member>) {
    return this.memberRepository.findOneAndRemove(where, { scores: true });
  }
}
