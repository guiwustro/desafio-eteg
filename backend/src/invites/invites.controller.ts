import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { InvitesService } from './invites.service';
import { CreateInviteDto } from './dto/create-invite.dto';
import { IsPublic } from '@/auth/decorators/is-public.decorator';

@Controller('invites')
export class InvitesController {
  constructor(private readonly invitesService: InvitesService) {}

  @Post()
  create(@Body() createInviteDto: CreateInviteDto) {
    return this.invitesService.create(createInviteDto);
  }

  @Get()
  findAll() {
    return this.invitesService.findAll();
  }

  @IsPublic()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invitesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invitesService.remove(id);
  }
}
