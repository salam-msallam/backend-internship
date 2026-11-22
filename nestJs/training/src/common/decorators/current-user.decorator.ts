import { createParamDecorator, UnauthorizedException } from '@nestjs/common';

import type { ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import type { AuthUser } from '../../auth/auth-user.interface.js';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): AuthUser => {
    const request = context.switchToHttp().getRequest<Request>();

    if (!request.user) {
      throw new UnauthorizedException();
    }

    return request.user;
  },
);
