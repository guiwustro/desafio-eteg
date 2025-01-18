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

export class BadRequestSwaggerEmailAlreadyExists {
  @ApiProperty({
    example: 403,
  })
  statusCode: number;

  @ApiProperty({
    example: 'Este e-mail já está registrado.',
  })
  message: string;
}

export class BadRequestSwaggerCPFAlreadyExists {
  @ApiProperty({
    example: 403,
  })
  statusCode: number;

  @ApiProperty({
    example: 'Este CPF já está registrado.',
  })
  message: string;
}
