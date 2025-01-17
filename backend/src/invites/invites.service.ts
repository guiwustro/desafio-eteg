import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateInviteDto } from './dto/create-invite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Invite } from './entities/invite.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InvitesService {
  constructor(
    @InjectRepository(Invite)
    private readonly inviteRepository: Repository<Invite>,
  ) {}

  async create(createInviteDto: CreateInviteDto) {
    const invite = await this.inviteRepository.save(createInviteDto);
    return invite;
  }

  async findAll() {
    const invites = await this.inviteRepository.find();
    return invites;
  }

  async findOne(id: string) {
    try {
      const invite = await this.inviteRepository.findOneBy({ id });

      if (!invite) {
        throw new HttpException('Invite not found.', HttpStatus.NOT_FOUND);
      }

      return invite;
    } catch (error) {
      if (error.code === '22P02') {
        // PostgreSQL error code for invalid input syntax
        throw new BadRequestException('Invalid UUID format');
      }
      throw error;
    }
  }

  async checkInviteAndAddUseToInvite(id: string) {
    const invite = await this.findOne(id);

    if (!invite) {
      throw new HttpException('Invite not found.', HttpStatus.NOT_FOUND);
    }

    if (invite.expirationDate && new Date() > new Date(invite.expirationDate)) {
      throw new HttpException(
        'The invitation has expired.',
        HttpStatus.CONFLICT,
      );
    }
    if (invite.currentUses === invite.maxUses) {
      throw new HttpException(
        'The invitation has reached its maximum usage.',
        HttpStatus.CONFLICT,
      );
    }

    await this.inviteRepository.update(id, {
      currentUses: invite.currentUses + 1,
    });
  }

  async remove(id: string) {
    const invite = await this.findOne(id);
    if (!invite) {
      throw new HttpException('Invite not found.', HttpStatus.NOT_FOUND);
    }

    await this.inviteRepository.delete(id);

    return { message: `Invite ${invite.id} removed successfully.` };
  }
}
