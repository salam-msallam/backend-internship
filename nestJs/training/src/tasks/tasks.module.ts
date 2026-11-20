import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TasksController } from './tasks.controller.js';
import { TasksService } from './tasks.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { LoggerMiddleware } from '../common/middleware/logger/logger.middleware.js';

@Module({
  imports: [PrismaModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(TasksController);
  }
}
