import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { LoginDto } from './dto/login.dto.js';
import type { AuthUser } from './auth-user.interface.js';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(dto: LoginDto) {
    if (
      dto.username !== process.env.TRAINING_USERNAME ||
      dto.password !== process.env.TRAINING_PASSWORD
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: AuthUser = {
      sub: 1,
      username: dto.username,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
