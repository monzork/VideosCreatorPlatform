import { Expose, Exclude } from 'class-transformer';
export class ReadUserDto {
  @Expose() id: number;
  @Expose() name: string;
  @Expose() email: string;
  @Expose() type: string;
  @Expose() photo: string;
}

export class ReadUserDtoPaginated {
  @Expose() total: number;
  @Expose() data: ReadUserDto[];
}

export class InsertUserDto {
  @Expose() name: string;
  @Expose() email: string;
  @Expose() type: string;
  @Expose() photo: string;
  @Expose() password: string;
}
