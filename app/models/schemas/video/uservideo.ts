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
  @Expose() id: number;
  @Expose() like: number;
  @Expose() published: boolean;
  @Expose() title: string;
  @Expose() url: string;
  @Expose() name: string;
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
