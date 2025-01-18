import { Test, TestingModule } from '@nestjs/testing';
import { InvitesController } from './invites.controller';
import { InvitesService } from './invites.service';
import { CreateInviteDto } from './dto/create-invite.dto';

describe('InvitesController', () => {
  let controller: InvitesController;
  let service: InvitesService;

  const mockInvite = {
    id: '123',
    currentUses: 0,
    maxUses: 5,
    expirationDate: '2025-01-01',
  };

  const mockCreateInviteDto: CreateInviteDto = {
    ...mockInvite,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvitesController],
      providers: [
        {
          provide: InvitesService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockInvite),
            findAll: jest.fn().mockResolvedValue([mockInvite]),
            checkInvite: jest.fn().mockResolvedValue(mockInvite),
            remove: jest.fn().mockResolvedValue({
              message: `Invite ${mockInvite.id} removed successfully.`,
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<InvitesController>(InvitesController);
    service = module.get<InvitesService>(InvitesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call invitesService.create and return an invite', async () => {
      const result = await controller.create(mockCreateInviteDto);
      expect(result).toEqual(mockInvite);
      expect(service.create).toHaveBeenCalledWith(mockCreateInviteDto);
    });
  });

  describe('findAll', () => {
    it('should call invitesService.findAll and return all invites', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([mockInvite]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call invitesService.checkInvite and return an invite', async () => {
      const result = await controller.findOne('123');
      expect(result).toEqual(mockInvite);
      expect(service.checkInvite).toHaveBeenCalledWith('123');
    });
  });

  describe('remove', () => {
    it('should call invitesService.remove and return success message', async () => {
      const result = await controller.remove('123');
      expect(result).toEqual({ message: `Invite 123 removed successfully.` });
      expect(service.remove).toHaveBeenCalledWith('123');
    });
  });
});
