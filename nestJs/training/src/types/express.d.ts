import type { AuthUser } from '../auth/auth-user.interface.js';

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export {};
