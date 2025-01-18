import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateInviteDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  expirationDate: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  maxUses: number;
}
