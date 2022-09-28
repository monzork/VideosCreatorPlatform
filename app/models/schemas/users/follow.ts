import { Expose } from 'class-transformer';
import { ReadUserDto } from './user';
export class ReadFollowDto {
  @Expose() id: number;
  @Expose() followerId: number;
  @Expose() followedId: number;
}

export class ReadFollowDtoPaginated {
  @Expose() total: number;
  @Expose() data: ReadUserDto[];
}

export class InsertFollowDto {
  @Expose() followerId: number;
  @Expose() followedId: number;
}
