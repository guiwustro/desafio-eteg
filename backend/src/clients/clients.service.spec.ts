import { Test, TestingModule } from '@nestjs/testing';
import { ClientsService } from './clients.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { InvitesService } from '../invites/invites.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('ClientsService', () => {
  let service: ClientsService;
  let repository: Repository<Client>;
  let inviteService: InvitesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientsService,
        {
          provide: getRepositoryToken(Client),
          useClass: Repository,
        },
        {
          provide: InvitesService,
          useValue: {
            checkInviteAndAddUseToInvite: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
    repository = module.get<Repository<Client>>(getRepositoryToken(Client));
    inviteService = module.get<InvitesService>(InvitesService);
  });

  describe('create', () => {
    it('should throw an error if email already exists', async () => {
      jest.spyOn(service, 'findByEmail').mockResolvedValue({ id: 1 } as Client);

      const dto: CreateClientDto = {
        name: 'Test Client',
        cpf: '12345678901',
        email: 'test@example.com',
        color: '#FF0000',
        isActive: true,
      };

      await expect(service.create(dto)).rejects.toThrow(
        new HttpException('Email already exists.', HttpStatus.BAD_REQUEST),
      );
    });

    it('should create a new client successfully', async () => {
      jest.spyOn(service, 'findByEmail').mockResolvedValue(null);
      jest.spyOn(service, 'findByCpf').mockResolvedValue(null);
      jest.spyOn(repository, 'save').mockResolvedValue({ id: 1 } as Client);

      const dto: CreateClientDto = {
        name: 'Test Client',
        cpf: '12345678901',
        email: 'test@example.com',
        color: '#FF0000',
        isActive: true,
      };

      const result = await service.create(dto);
      expect(result).toHaveProperty('id');
    });
  });

  describe('update', () => {
    it('should throw an error if client does not exist', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      await expect(service.update(1, {} as UpdateClientDto)).rejects.toThrow(
        new HttpException('Client not found.', HttpStatus.NOT_FOUND),
      );
    });

    it('should update the client successfully', async () => {
      const client = { id: 1, email: 'old@example.com' } as Client;
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(client);
      jest.spyOn(repository, 'update').mockResolvedValue(null);

      const updateDto: UpdateClientDto = { email: 'new@example.com' };

      const result = await service.update(1, updateDto);
      expect(result.email).toBe(updateDto.email);
    });
  });

  describe('remove', () => {
    it('should throw an error if client does not exist', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrow(
        new HttpException('Client not found.', HttpStatus.NOT_FOUND),
      );
    });

    it('should remove a client successfully', async () => {
      const client = { id: 1, name: 'Client Test' } as Client;
      jest.spyOn(service, 'findOne').mockResolvedValue(client);
      jest.spyOn(repository, 'delete').mockResolvedValue(null);

      const result = await service.remove(1);
      expect(result.message).toBe(`Client Client Test removed successfully.`);
    });
  });

  describe('findOne', () => {
    it('should return a client by id', async () => {
      const client = { id: 1 } as Client;
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(client);

      const result = await service.findOne(1);
      expect(result).toEqual(client);
    });
  });

  describe('createByInvite', () => {
    it('should check the invite and create a client', async () => {
      jest.spyOn(service, 'findByEmail').mockResolvedValue(null);
      jest.spyOn(service, 'findByCpf').mockResolvedValue(null);
      jest.spyOn(repository, 'save').mockResolvedValue({ id: 1 } as Client);

      const dto: CreateClientDto = {
        name: 'Test Client',
        cpf: '12345678901',
        email: 'test@example.com',
        color: '#FF0000',
        isActive: true,
      };

      const result = await service.createByInvite(
        'af8d83ff-6a92-4110-92d4-d6fb48c1858e',
        dto,
      );
      expect(result).toHaveProperty('id');
      expect(inviteService.checkInviteAndAddUseToInvite).toHaveBeenCalledWith(
        'af8d83ff-6a92-4110-92d4-d6fb48c1858e',
      );
    });
  });

  describe('getPaginatedClients', () => {
    it('should return paginated clients', async () => {
      jest
        .spyOn(repository, 'findAndCount')
        .mockResolvedValue([[{ id: 1, name: 'Test Client' } as Client], 1]);

      const result = await service.getPaginatedClients(1, 10);
      expect(result.data).toHaveLength(1);
      expect(result.total).toBe(1);
      expect(result.page).toBe(1);
      expect(result.totalPages).toBe(1);
    });
  });
});
