import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  MaxLength,
} from 'class-validator';

export class CreateClientDto {
  @ApiProperty({
    example: 'Name 1',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '12345678901',
  })
  @IsString()
  @MaxLength(11)
  @IsNotEmpty()
  cpf: string;

  @ApiProperty({
    example: 'test@test.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '#FF0000',
  })
  @IsString()
  @IsNotEmpty()
  color: string;

  @ApiPropertyOptional({
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive: boolean = true;

  @ApiPropertyOptional({
    example: 'Some notes...',
  })
  @IsString()
  @IsOptional()
  observations?: string;
}
