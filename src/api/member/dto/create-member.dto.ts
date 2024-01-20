import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { PointGeoMetry } from '../../../libs/common';
import { Expose, Type } from 'class-transformer';
import { ScoreDto } from '../../score/dto/score.dto';

export class CreateMemberDto {
  @IsString()
  @MaxLength(10)
  @Expose()
  name: string;

  @IsString()
  @MaxLength(20)
  @Expose()
  nickname: string;

  @Matches(RegExp('[0-9]{4}-[0-9]{2}-[0-9]{2}$'), {
    message: 'must match format yyyy-MM-dd',
  })
  @Expose()
  birthday: string;

  @ValidateNested()
  @Type(() => PointGeoMetry)
  @Expose()
  location: PointGeoMetry;

  @ValidateNested()
  @Type(() => ScoreDto)
  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @Expose()
  scores?: ScoreDto[];
}
