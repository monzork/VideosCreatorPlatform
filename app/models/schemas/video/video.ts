import User from '../../domain/user.model';
import { Expose, Exclude } from 'class-transformer';
export class ReadVideoDto {
  @Expose() id: number;
  @Expose() published: boolean;
  @Expose() title: string;
  @Expose() url: string;
  @Expose() createdBy: number;
}

export class ReadVideoDtoPaginated {
  @Expose() total: number;
  @Expose() data: ReadVideoDto[];
}

export class InsertVideoDto {
  @Expose() published: boolean;
  @Expose() title: string;
  @Expose() url: string;
  @Expose() createdBy: number;
}

export class UpdateVideoDto {
  @Expose() id: number;
  @Expose() published: boolean;
  @Expose() title: string;
  @Expose() url: string;
}
