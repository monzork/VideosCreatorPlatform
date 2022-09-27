import { Expose } from 'class-transformer';

export class ReadUserDto {
  @Expose() public id: number;
  @Expose() public name: string;
  @Expose() public email: string;
  @Expose() public type: string;
  @Expose() public photo: string;
}

export type ReadUserDtoType = {
  [K in keyof ReadUserDto]-?: ReadUserDto[K];
};
