import { CreateMemberDto } from './dto/create-member.dto';
import { GetMembersFilterDto } from './dto/get-members-filter.dto';
import { MemberRepository } from './member.repository';
import { Member } from '../../entity';
import { BadRequestException } from '../../libs/common';
import {
  Between,
  FindManyOptions,
  FindOptionsWhere,
  In,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
} from 'typeorm';

export class MemberService {
  constructor(private readonly memberRepository = new MemberRepository()) {}

  async findOneByKey(where: FindOptionsWhere<Member>) {
    return this.memberRepository.findOne(where, { scores: true });
  }

  async findByFilter(filter: GetMembersFilterDto) {
    const where: FindManyOptions<Member> = {
      where: {
        id:
          filter.osm_id &&
          In(await this.membersInSpecificDistrict(filter.osm_id)),
        nickname: filter.nickname && Like('%' + filter.nickname + '%'),
        name: filter.name && Like('%' + filter.name + '%'),
        birthday:
          filter.start_date && filter.end_date
            ? Between(filter.start_date, filter.end_date)
            : filter.start_date
            ? MoreThanOrEqual(filter.start_date)
            : filter.end_date
            ? LessThanOrEqual(filter.end_date)
            : undefined,
      },
      order: {
        birthday: 'DESC',
        createdAt: 'DESC',
      },
      relations: { scores: true },
    };
    return this.memberRepository.find(where);
  }

  async create(payload: CreateMemberDto) {
    if (await this.memberRepository.validationNickname(payload.nickname)) {
      throw new BadRequestException(`nickname is exist`);
    }

    return this.memberRepository.create(new Member(payload));
  }

  async deleteByKey(where: FindOptionsWhere<Member>) {
    return this.memberRepository.findOneAndRemove(where, { scores: true });
  }

  async membersInSpecificDistrict(osm_id: string) {
    return this.memberRepository.membersInSpecificDistrict(osm_id);
  }
}
