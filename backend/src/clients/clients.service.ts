import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvitesService } from '../invites/invites.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    private readonly inviteService: InvitesService,
  ) {}

  async create(createClientDto: CreateClientDto) {
    await this.validateUniqueFields(createClientDto);

    const client = await this.clientRepository.save(createClientDto);
    return client;
  }

  async createByInvite(id: string, createClientDto: CreateClientDto) {
    await this.inviteService.checkInviteAndAddUseToInvite(id);

    await this.validateUniqueFields(createClientDto);

    const client = await this.clientRepository.save(createClientDto);
    return client;
  }

  async getPaginatedClients(
    page: number,
    limit: number,
  ): Promise<{
    data: Client[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;
    const [clients, total] = await this.clientRepository.findAndCount({
      take: limit,
      skip: skip,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      data: clients,
      total,
      page,
      totalPages,
    };
  }

  async findOne(id: number): Promise<Client> {
    const client = await this.clientRepository.findOneBy({ id });
    return client;
  }

  async findByEmail(email: string) {
    const user = await this.clientRepository.findOneBy({ email });
    return user;
  }

  async findByCpf(cpf: string) {
    const user = await this.clientRepository.findOneBy({ cpf });
    return user;
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const client = await this.findOne(id);

    if (!client) {
      throw new HttpException('Client not found.', HttpStatus.NOT_FOUND);
    }

    await this.validateUniqueFields(updateClientDto, id);

    await this.clientRepository.update(id, updateClientDto);

    return { ...client, ...updateClientDto };
  }

  async remove(id: number) {
    const client = await this.findOne(id);
    if (!client) {
      throw new HttpException('Client not found.', HttpStatus.NOT_FOUND);
    }

    await this.clientRepository.delete(id);

    return { message: `Client ${client.name} removed successfully.` };
  }

  private async validateUniqueFields(
    clientDto: Partial<CreateClientDto>,
    id?: number,
  ): Promise<void> {
    if (clientDto?.email) {
      const emailAlreadyExists = await this.findByEmail(clientDto.email);
      if (emailAlreadyExists && emailAlreadyExists.id !== id) {
        throw new HttpException(
          'Este email já está registrado.',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (clientDto?.cpf) {
      const cpfAlreadyExists = await this.findByCpf(clientDto.cpf);
      if (cpfAlreadyExists && cpfAlreadyExists.id !== id) {
        throw new HttpException(
          'Este CPF já está registrado.',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
}
