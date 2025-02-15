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
    const invite = await this.checkInvite(id);

    await this.inviteRepository.update(id, {
      currentUses: invite.currentUses + 1,
    });
  }

  async checkInvite(id: string) {
    const invite = await this.findOne(id);

    if (!invite) {
      throw new HttpException('Invite not found.', HttpStatus.NOT_FOUND);
    }

    this.checkIfExpired(invite.expirationDate);
    this.checkIfMaxUsesReached(invite.currentUses, invite.maxUses);

    return invite;
  }

  async remove(id: string) {
    const invite = await this.findOne(id);
    if (!invite) {
      throw new HttpException('Invite not found.', HttpStatus.NOT_FOUND);
    }

    await this.inviteRepository.delete(id);

    return { message: `Invite ${invite.id} removed successfully.` };
  }

  private checkIfExpired(expirationDate?: Date) {
    if (expirationDate && new Date() > new Date(expirationDate)) {
      throw new HttpException(
        'The invitation has expired.',
        HttpStatus.CONFLICT,
      );
    }
  }

  private checkIfMaxUsesReached(currentUses: number, maxUses: number) {
    if (maxUses && currentUses >= maxUses) {
      throw new HttpException(
        'The invitation has reached its maximum usage.',
        HttpStatus.CONFLICT,
      );
    }
  }
}
