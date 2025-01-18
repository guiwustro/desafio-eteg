import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { InvitesService } from './invites.service';
import { CreateInviteDto } from './dto/create-invite.dto';
import { IsPublic } from '.././auth/decorators/is-public.decorator';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { SwaggerResponses } from './swagger/responses.swagger';

@Controller('invites')
export class InvitesController {
  constructor(private readonly invitesService: InvitesService) {}

  @ApiOperation({ summary: 'Create a new invite' })
  @ApiResponse(SwaggerResponses.inviteCreated)
  @Post()
  create(@Body() createInviteDto: CreateInviteDto) {
    return this.invitesService.create(createInviteDto);
  }

  @ApiOperation({ summary: 'Retrieve all invites' })
  @ApiResponse(SwaggerResponses.invitesRetrieved)
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.invitesService.findAll();
  }

  @ApiOperation({ summary: 'Check if an invite is valid' })
  @ApiResponse(SwaggerResponses.inviteValid)
  @ApiResponse(SwaggerResponses.inviteNotFound)
  @ApiResponse(SwaggerResponses.inviteExpired)
  @ApiResponse(SwaggerResponses.inviteMaxUsesReached)
  @ApiParam({ name: 'id', type: String, description: 'Invite ID' })
  @HttpCode(HttpStatus.OK)
  @IsPublic()
  @Get(':id/check')
  findOne(@Param('id') id: string) {
    return this.invitesService.checkInvite(id);
  }

  @ApiOperation({ summary: 'Delete an invite' })
  @ApiResponse(SwaggerResponses.inviteDeleted)
  @ApiResponse(SwaggerResponses.inviteNotFound)
  @ApiParam({ name: 'id', type: String, description: 'Invite ID' })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invitesService.remove(id);
  }
}
