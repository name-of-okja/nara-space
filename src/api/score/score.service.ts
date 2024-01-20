import { plainToInstance } from 'class-transformer';
import { MemberService } from '../member/member.service';
import { UpsertScoreDto } from './dto/upsert-score.dto';
import { ScoreRepository } from './score.repository';
import { Score } from '../../entity';

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
    const score = plainToInstance(Score, payload, {
      excludeExtraneousValues: true,
    });

    return this.scoreRepository.create(score);
  }
}
