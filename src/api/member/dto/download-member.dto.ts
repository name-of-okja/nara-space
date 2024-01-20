import { Expose } from 'class-transformer';

export class DownloadMemberDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  nickname: string;

  @Expose()
  birthday: string;

  @Expose()
  createdAt: Date;
}
