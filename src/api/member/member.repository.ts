import { FindManyOptions } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { District, Member } from '../../entity';
import { AbstractRepository } from '../../libs/common';

export class MemberRepository extends AbstractRepository<Member> {
  constructor(
    private readonly memberRepository = AppDataSource.getRepository(Member)
  ) {
    super('Member', memberRepository);
  }

  async validationNickname(nickname: string): Promise<boolean> {
    return this.memberRepository.existsBy({ nickname });
  }

  async membersInSpecificDistrict(osm_id: string) {
    const geo = await this.entityManager.findOneBy(District, { osm_id });

    if (!geo) {
      return [];
    }

    return this.memberRepository
      .createQueryBuilder('member')
      .select(['member.id'])
      .where(`ST_Within(member.location, ST_GeomFromGeoJSON(:geometry))`, {
        geometry: JSON.stringify(geo.geometry),
      })
      .getMany()
      .then((values) => values.map((value) => value.id));
  }
}
