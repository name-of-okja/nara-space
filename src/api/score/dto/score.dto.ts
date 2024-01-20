import { Expose } from 'class-transformer';
import { IsIn, IsNumber, Max, Min } from 'class-validator';
import { Subject } from '../../../entity';

export class ScoreDto {
  @IsIn(['math', 'science', 'english'], {
    message: 'must match ["math", "science", "english"]',
  })
  @Expose()
  subject: Subject;

  @IsNumber()
  @Min(0)
  @Max(100)
  @Expose()
  score: number;
}
