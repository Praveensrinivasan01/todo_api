import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(15)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[a-z]).*$/, {
    message: 'password too weak, choose a password between 6 and 15 characters',
  })
  password: string;
}
