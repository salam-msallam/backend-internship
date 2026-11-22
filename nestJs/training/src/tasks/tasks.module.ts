import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TasksController } from './tasks.controller.js';
import { TasksService } from './tasks.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { LoggerMiddleware } from '../common/middleware/logger/logger.middleware.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(TasksController);
  }
}
