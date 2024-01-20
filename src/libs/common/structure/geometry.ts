import { Expose } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  Equals,
  IsArray,
  IsNumber,
  IsString,
} from 'class-validator';

export class PointGeoMetry {
  @IsString()
  @Equals('Point', { message: 'must match Point' })
  @Expose()
  type: 'Point' = 'Point';

  @IsArray()
  @IsNumber({}, { each: true })
  @ArrayMinSize(2, { message: 'must coordinates length 2' })
  @ArrayMaxSize(2, { message: 'must coordinates length 2' })
  @Expose()
  coordinates: number[];
}
