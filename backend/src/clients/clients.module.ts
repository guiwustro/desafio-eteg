import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invite } from '../invites/entities/invite.entity';
import { InvitesService } from '../invites/invites.service';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { Client } from './entities/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Invite])],
  controllers: [ClientsController],
  providers: [ClientsService, InvitesService],
})
export class ClientsModule {}
