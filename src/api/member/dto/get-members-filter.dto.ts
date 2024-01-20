import { Expose } from 'class-transformer';
import { IsOptional, IsString, Matches, MaxLength } from 'class-validator';

export class GetMembersFilterDto {
  @IsOptional()
  @Matches(RegExp('[0-9]{4}-[0-9]{2}-[0-9]{2}$'), {
    message: 'must match format yyyy-MM-dd',
  })
  @Expose()
  start_date?: string;

  @IsOptional()
  @Matches(RegExp('[0-9]{4}-[0-9]{2}-[0-9]{2}$'), {
    message: 'must match format yyyy-MM-dd',
  })
  @Expose()
  end_date?: string;

  @IsString()
  @MaxLength(10)
  @IsOptional()
  @Expose()
  name?: string;

  @IsString()
  @MaxLength(20)
  @IsOptional()
  @Expose()
  nickname?: string;
}
