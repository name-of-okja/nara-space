import { Subject } from '../../../entity';

export class CreateScoreDto {
  memberId: number;
  subject: Subject;
  score: number;
}
