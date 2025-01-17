import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { InvitesService } from '@/invites/invites.service';
import { Invite } from '@/invites/entities/invite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Invite])],
  controllers: [ClientsController],
  providers: [ClientsService, InvitesService],
})
export class ClientsModule {}
