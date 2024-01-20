import { Expose } from 'class-transformer';
import { ScoreDto } from './score.dto';
import { IsNumber } from 'class-validator';

export class UpsertScoreDto extends ScoreDto {
  @IsNumber()
  @Expose()
  memberId: number;
}
