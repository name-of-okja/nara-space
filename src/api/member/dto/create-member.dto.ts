import {
  IsArray,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  ValidateNested,
  isNotEmpty,
} from 'class-validator';
import { PointGeoMetry } from '../../../libs/common';
import { Subject } from '../../../entity';
import { Expose, Type } from 'class-transformer';

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
  @Type(() => CreateMemberScoreDto)
  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @Expose()
  scores?: CreateMemberScoreDto[];
}

class CreateMemberScoreDto {
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
