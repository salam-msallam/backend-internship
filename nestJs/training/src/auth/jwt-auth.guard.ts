import { Injectable, UnauthorizedException } from '@nestjs/common';

import type { CanActivate, ExecutionContext } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import type { AuthUser } from './auth-user.interface.js';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Access token is required');
    }

    try {
      request.user = await this.jwtService.verifyAsync<AuthUser>(token);
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }

    return true;
  }
}
