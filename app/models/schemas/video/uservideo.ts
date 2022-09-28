import { Expose } from 'class-transformer';
import { ReadVideoDto } from './video';
export class ReadUserVideoDto {
  @Expose() id: number;
  @Expose() like: boolean;
  @Expose() view: number;
  @Expose() videoId: number;
  @Expose() userId: number;
}

export class ReadUserVideoInformationDto {
  @Expose() view: number;
  @Expose() like: number;
}

export class InsertUserVideoDto {
  @Expose() like: boolean;
  @Expose() view: number;
  @Expose() videoId: number;
  @Expose() userId: number;
}

export class UpdateUserVideoDto {
  @Expose() id: number;
  @Expose() like: boolean;
  @Expose() view: number;
  @Expose() videoId: number;
  @Expose() userId: number;
}
