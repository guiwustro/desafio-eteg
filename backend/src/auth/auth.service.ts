import { IUserPayload } from './models/user.payload';
import { HttpStatus } from '@nestjs/common/enums';
import { instanceToPlain } from 'class-transformer';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { HttpException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        return instanceToPlain({
          ...user,
        });
      }
    }
    throw new HttpException('Wrong email or password.', HttpStatus.FORBIDDEN);
  }

  login(userData: User): { token: string } {
    const payload: IUserPayload = {
      sub: userData.id,
      email: userData.email,
    };
    const token = this.jwtService.sign(payload);
    return { token };
  }
}
