import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateInviteDto {
  @IsOptional()
  @IsString()
  expirationDate: string;

  @IsOptional()
  @IsNumber()
  maxUses: number;
}
