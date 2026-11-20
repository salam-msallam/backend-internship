import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

import type { Request, Response } from 'express';
import { Prisma } from '../../../generated/prisma/client.js';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();

      const errorResponse = exception.getResponse();

      if (typeof errorResponse === 'string') {
        message = errorResponse;
      } else {
        const responseMessage =
          'message' in errorResponse ? errorResponse.message : undefined;

        message =
          typeof responseMessage === 'string' ||
          (Array.isArray(responseMessage) &&
            responseMessage.every(
              (item): item is string => typeof item === 'string',
            ))
            ? responseMessage
            : exception.message;
      }
    } else if (exception instanceof Prisma.PrismaClientValidationError) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Invalid data provided';

      this.logger.warn('Prisma validation failed');
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2025':
          status = HttpStatus.NOT_FOUND;
          message = 'Requested record not found';
          break;

        case 'P2002':
          status = HttpStatus.CONFLICT;
          message = 'A unique value already exists';
          break;

        default:
          this.logger.error(exception);
      }
    } else {
      this.logger.error(exception);
    }

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.originalUrl,
    });
  }
}
