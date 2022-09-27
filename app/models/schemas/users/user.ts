import { Expose } from 'class-transformer';

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

// export type ReadUserDtoType = {
//   [K in keyof ReadUserDto]-?: ReadUserDto[K];
// };
