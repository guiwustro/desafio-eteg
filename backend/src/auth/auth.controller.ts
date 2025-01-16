import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthRequest } from './models/user.request';
import { AuthService } from './auth.service';
import { IsPublic } from './decorators/is-public.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }
}
