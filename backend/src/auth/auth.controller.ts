import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthRequest } from './models/user.request';
import { IsPublic } from './decorators/is-public.decorator';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }
}
