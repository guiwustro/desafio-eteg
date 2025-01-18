import { ApiProperty } from '@nestjs/swagger';

export class BadRequestSwaggerNotFound {
  @ApiProperty({
    example: 404,
  })
  statusCode: number;

  @ApiProperty({
    example: 'Client not found.',
  })
  message: string;
}

export class BadRequestSwaggerInvitationExpired {
  @ApiProperty({
    example: 409,
  })
  statusCode: number;

  @ApiProperty({
    example: 'The invitation has expired.',
  })
  message: string;
}

export class BadRequestSwaggerInvitationMaxUsage {
  @ApiProperty({
    example: 409,
  })
  statusCode: number;

  @ApiProperty({
    example: 'The invitation has reached its maximum usage.',
  })
  message: string;
}
