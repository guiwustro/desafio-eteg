import { IsString } from 'class-validator';

export class UserLogin {
  @IsString()
  email: string;
  @IsString()
  password: string;
}
