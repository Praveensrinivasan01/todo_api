import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateToDoDto {
  @IsNotEmpty()
  @MaxLength(15, { message: 'max length is 15 characters' })
  title: string;
  @IsNotEmpty()
  description: string;
}
