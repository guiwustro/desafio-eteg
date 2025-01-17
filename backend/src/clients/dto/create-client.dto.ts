import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  MaxLength,
} from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @MaxLength(11)
  @IsNotEmpty()
  cpf: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsBoolean()
  @IsOptional()
  is_active: boolean = true;

  @IsString()
  @IsOptional()
  observations?: string;
}
