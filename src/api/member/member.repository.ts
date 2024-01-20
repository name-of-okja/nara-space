import {
  And,
  Between,
  FindManyOptions,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
} from 'typeorm';
import { AppDataSource } from '../../data-source';
import { Member } from '../../entity';
import { AbstractRepository } from '../../libs/common';
import { GetMembersFilterDto } from './dto/get-members-filter.dto';

export class MemberRepository extends AbstractRepository<Member> {
  constructor(
    private readonly memberRepository = AppDataSource.getRepository(Member)
  ) {
    super(memberRepository);
  }

  async findByFilter(filter: GetMembersFilterDto) {
    const query: FindManyOptions<Member> = {
      where: {
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
      relations: { scores: true },
    };

    return this.memberRepository.find(query);
  }

  async validationNickname(nickname: string): Promise<boolean> {
    return this.memberRepository.existsBy({ nickname });
  }
}
