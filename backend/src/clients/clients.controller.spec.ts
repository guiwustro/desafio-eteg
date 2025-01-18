import { Test, TestingModule } from '@nestjs/testing';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PaginationDto } from './dto/pagination.dto';

describe('ClientsController', () => {
  let controller: ClientsController;
  let service: ClientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientsController],
      providers: [
        {
          provide: ClientsService,
          useValue: {
            create: jest.fn(),
            createByInvite: jest.fn(),
            getPaginatedClients: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ClientsController>(ClientsController);
    service = module.get<ClientsService>(ClientsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call ClientsService.create', async () => {
    const dto: CreateClientDto = {
      name: 'Client Test',
      cpf: '12345678901',
      email: 'test1@example.com',
      color: '#FF0000',
      isActive: true,
    };
    await controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should call ClientsService.createByInvite', async () => {
    const dto: CreateClientDto = {
      name: 'Client Test 2',
      cpf: '98765432101',
      email: 'test2@example.com',
      color: '#FF0000',
      isActive: true,
    };
    const id = 'af8d83ff-6a92-4110-92d4-d6fb48c1858e';
    await controller.createByInvite(id, dto);
    expect(service.createByInvite).toHaveBeenCalledWith(id, dto);
  });

  it('should call ClientsService.getPaginatedClients', async () => {
    const paginationDto: PaginationDto = { page: 1, limit: 10 };
    await controller.getPaginatedClients(paginationDto);
    expect(service.getPaginatedClients).toHaveBeenCalledWith(
      paginationDto.page,
      paginationDto.limit,
    );
  });

  it('should call ClientsService.findOne', async () => {
    const id = '1';
    await controller.findOne(id);
    expect(service.findOne).toHaveBeenCalledWith(+id);
  });

  it('should call ClientsService.update', async () => {
    const id = '1';
    const dto: UpdateClientDto = { name: 'Updated Name' };
    await controller.update(id, dto);
    expect(service.update).toHaveBeenCalledWith(+id, dto);
  });

  it('should call ClientsService.remove', async () => {
    const id = '1';
    await controller.remove(id);
    expect(service.remove).toHaveBeenCalledWith(+id);
  });
});
