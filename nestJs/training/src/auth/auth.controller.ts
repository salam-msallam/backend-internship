import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
} from '@nestjs/common';

import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import type { AuthUser } from './auth-user.interface.js'
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { JwtAuthGuard } from './jwt-auth.guard.js';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
@Get('me')
getProfile(@CurrentUser() user: AuthUser) {
  return {
    id: user.sub,
    username: user.username,
  };
}

  
}
