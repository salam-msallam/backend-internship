import { Injectable, Logger } from '@nestjs/common';

import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';

import { finalize } from 'rxjs';
import type { Observable } from 'rxjs';
import type { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const start = Date.now();

    return next.handle().pipe(
      finalize(() => {
        const duration = Date.now() - start;

        this.logger.log(
          `${request.method} ${request.path} ${response.statusCode} - ${duration}ms`,
        );
      }),
    );
  }
}
