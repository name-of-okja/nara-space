import { plainToInstance } from 'class-transformer';
import { MemberService } from '../member/member.service';
import { UpsertScoreDto } from './dto/upsert-score.dto';
import { ScoreRepository } from './score.repository';
import { Score, Subject } from '../../entity';
import { In } from 'typeorm';

export class ScoreService {
  constructor(private readonly scoreRepository = new ScoreRepository()) {}

  async upsert(payload: UpsertScoreDto) {
    const member = await new MemberService().findOneByKey({
      id: payload.memberId,
    });

    if (member.scores.find((score) => score.subject === payload.subject)) {
      return this.scoreRepository.findOneAndUpdate(
        { memberId: member.id, subject: payload.subject },
        {
          score: payload.score,
        }
      );
    }

    return this.scoreRepository.create(new Score(payload));
  }

  async averageOfSpecificDistrict(osm_id: string) {
    const membersId = await new MemberService().membersInSpecificDistrict(
      osm_id
    );
    const scores = await this.scoreRepository.findBy({
      memberId: In(membersId),
    });

    const { math, science, english } = scores.reduce(
      (prev, cur) => {
        const data = prev[cur.subject];
        return {
          ...prev,
          [cur.subject]: {
            score: data.score + cur.score,
            count: data.count + 1,
          },
        };
      },
      {
        math: { score: 0, count: 0 },
        science: { score: 0, count: 0 },
        english: { score: 0, count: 0 },
      } as { [P in Subject]: { score: number; count: number } }
    );

    return {
      math: math.score > 0 ? math.score / math.count : 0,
      science: science.score > 0 ? science.score / science.count : 0,
      english: english.score > 0 ? english.score / english.count : 0,
    } as { [P in Subject]: number };
  }
}
