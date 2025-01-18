import { ApiResponseOptions } from '@nestjs/swagger';

import {
  BadRequestSwaggerCPFAlreadyExists,
  BadRequestSwaggerEmailAlreadyExists,
  BadRequestSwaggerNotFound,
} from './bad-request.swagger';
import { Client } from '../entities/client.entity';

export const SwaggerResponses = {
  clientCreated: {
    status: 201,
    description: 'Client successfully created',
    type: Client,
  } as ApiResponseOptions,

  emailAlreadyExists: {
    status: 403,
    description: 'E-mail already exists',
    type: BadRequestSwaggerEmailAlreadyExists,
  } as ApiResponseOptions,

  cpfAlreadyExists: {
    status: 403,
    description: 'CPF already exists',
    type: BadRequestSwaggerCPFAlreadyExists,
  } as ApiResponseOptions,

  clientNotFound: {
    status: 404,
    description: 'Client not found',
    type: BadRequestSwaggerNotFound,
  } as ApiResponseOptions,

  invitationNotFound: {
    status: 404,
    description: 'Invitation not found',
    type: BadRequestSwaggerNotFound,
  } as ApiResponseOptions,

  clientsRetrieved: {
    status: 200,
    description: 'Successfully retrieved client list',
    type: Client,
    isArray: true,
  } as ApiResponseOptions,

  clientFound: {
    status: 200,
    description: 'Client found',
    type: Client,
  } as ApiResponseOptions,

  clientUpdated: {
    status: 200,
    description: 'Client successfully updated',
    type: Client,
  } as ApiResponseOptions,

  clientRemoved: {
    status: 200,
    description: 'Client successfully removed',
  } as ApiResponseOptions,
};
