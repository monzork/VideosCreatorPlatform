import { MaxLength, MinLength } from 'class-validator';

export class SignInUserDto {
  @MinLength(10)
  @MaxLength(20)
  email: string;

  @MinLength(20)
  password: string;
}

export class ReadSignInUserDto {
  token: string;
}
