import { ApiResponseOptions } from '@nestjs/swagger';

import { Invite } from '../entities/invite.entity';
import {
  BadRequestSwaggerInvitationExpired,
  BadRequestSwaggerInvitationMaxUsage,
  BadRequestSwaggerNotFound,
} from './bad-request.swagger';

export const SwaggerResponses = {
  inviteCreated: {
    status: 201,
    description: 'Invite successfully created',
    type: Invite,
  } as ApiResponseOptions,

  invitesRetrieved: {
    status: 200,
    description: 'Successfully retrieved invite list',
    isArray: true,
    type: Invite,
  } as ApiResponseOptions,

  inviteValid: {
    status: 200,
    description: 'Invite valid',
    type: Invite,
  } as ApiResponseOptions,

  inviteDeleted: {
    status: 200,
    description: 'Invite successfully removed',
  } as ApiResponseOptions,

  inviteExpired: {
    status: 409,
    description: 'The invitation has expired',
    type: BadRequestSwaggerInvitationExpired,
  } as ApiResponseOptions,

  inviteNotFound: {
    status: 404,
    description: 'Invite not found',
    type: BadRequestSwaggerNotFound,
  } as ApiResponseOptions,

  inviteMaxUsesReached: {
    status: 409,
    description: 'The invitation has reached its maximum usage',
    type: BadRequestSwaggerInvitationMaxUsage,
  } as ApiResponseOptions,
};
