import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  use(req: any, _res: any, next: () => void) {
    const { method, originalUrl } = req;
    this.logger.log(`[HTTP] ${method} ${originalUrl}`);

    next();
  }
}
