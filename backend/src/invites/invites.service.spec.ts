import { Test, TestingModule } from '@nestjs/testing';
import { InvitesService } from './invites.service';
import { Repository } from 'typeorm';
import { Invite } from './entities/invite.entity';
import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('InvitesService', () => {
  let service: InvitesService;
  let inviteRepository: Repository<Invite>;

  const mockInvite = {
    id: 'af8d83ff-6a92-4110-92d4-d6fb48c1858e',
    currentUses: 0,
    maxUses: 5,
    expirationDate: '2030-01-01',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvitesService,
        {
          provide: getRepositoryToken(Invite),
          useValue: {
            save: jest.fn().mockResolvedValue(mockInvite),
            find: jest.fn().mockResolvedValue([mockInvite]),
            findOneBy: jest.fn().mockResolvedValue(mockInvite),
            update: jest.fn().mockResolvedValue({ affected: 1 }),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
      ],
    }).compile();

    service = module.get<InvitesService>(InvitesService);
    inviteRepository = module.get<Repository<Invite>>(
      getRepositoryToken(Invite),
    );
  });

  describe('create', () => {
    it('should create and return an invite', async () => {
      const createInviteDto = { ...mockInvite };
      const result = await service.create(createInviteDto);
      expect(result).toEqual(mockInvite);
      expect(inviteRepository.save).toHaveBeenCalledWith(createInviteDto);
    });
  });

  describe('findAll', () => {
    it('should return all invites', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockInvite]);
      expect(inviteRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return an invite when found', async () => {
      const result = await service.findOne(
        'af8d83ff-6a92-4110-92d4-d6fb48c1858e',
      );
      expect(result).toEqual(mockInvite);
      expect(inviteRepository.findOneBy).toHaveBeenCalledWith({
        id: 'af8d83ff-6a92-4110-92d4-d6fb48c1858e',
      });
    });

    it('should throw HttpException when invite is not found', async () => {
      inviteRepository.findOneBy = jest.fn().mockResolvedValue(null);
      try {
        await service.findOne('af8d83ff-6a92-4110-92d4-d6fb48c1858e');
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.response).toBe('Invite not found.');
        expect(error.status).toBe(HttpStatus.NOT_FOUND);
      }
    });

    it('should throw BadRequestException for invalid UUID format', async () => {
      const invalidId = 'invalid-id';
      try {
        await service.findOne(invalidId);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.response).toBe('Invalid UUID format');
        expect(error.status).toBe(HttpStatus.BAD_REQUEST);
      }
    });
  });

  describe('remove', () => {
    it('should remove an invite successfully', async () => {
      const result = await service.remove(
        'af8d83ff-6a92-4110-92d4-d6fb48c1858e',
      );
      expect(result).toEqual({
        message: `Invite af8d83ff-6a92-4110-92d4-d6fb48c1858e removed successfully.`,
      });
      expect(inviteRepository.delete).toHaveBeenCalledWith(
        'af8d83ff-6a92-4110-92d4-d6fb48c1858e',
      );
    });

    it('should throw HttpException when invite is not found', async () => {
      inviteRepository.findOneBy = jest.fn().mockResolvedValue(null);
      try {
        await service.remove('af8d83ff-6a92-4110-92d4-d6fb48c1858e');
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.response).toBe('Invite not found.');
        expect(error.status).toBe(HttpStatus.NOT_FOUND);
      }
    });
  });

  describe('checkIfExpired', () => {
    it('should throw an error if invite is expired', () => {
      const expiredDate = new Date();
      expiredDate.setDate(expiredDate.getDate() - 1); // Data no passado

      expect(() => service['checkIfExpired'](expiredDate)).toThrow(
        new HttpException('The invitation has expired.', HttpStatus.CONFLICT),
      );
    });

    it('should not throw an error if invite is not expired', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 1);

      expect(() => service['checkIfExpired'](futureDate)).not.toThrow();
    });

    it('should not throw an error if invite has no expiration date', () => {
      expect(() => service['checkIfExpired'](undefined)).not.toThrow();
    });
  });

  describe('checkIfMaxUsesReached', () => {
    it('should throw an error if invite has reached max usage', () => {
      expect(() => service['checkIfMaxUsesReached'](5, 5)).toThrow(
        new HttpException(
          'The invitation has reached its maximum usage.',
          HttpStatus.CONFLICT,
        ),
      );
    });

    it('should not throw an error if invite has not reached max usage', () => {
      expect(() => service['checkIfMaxUsesReached'](4, 5)).not.toThrow();
    });
  });
});
