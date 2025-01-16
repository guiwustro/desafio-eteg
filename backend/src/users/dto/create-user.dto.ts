import { MaxLength, MinLength, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(25)
  password: string;
}
