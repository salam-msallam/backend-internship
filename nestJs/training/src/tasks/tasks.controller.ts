import { Controller, Get, Param } from '@nestjs/common';
import { TasksService } from './tasks.service.js';
import { Body, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto.js';
import { Patch, Delete } from '@nestjs/common';
import { UpdateTaskDto } from './dto/update-task.dto.js';
import { PositiveIntIdPipe } from '../common/pipes/positive-int-id/positive-int-id.pipe.js';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', PositiveIntIdPipe) id: string) {
    return this.tasksService.findOne(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', PositiveIntIdPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(Number(id), updateTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', PositiveIntIdPipe) id: string) {
    return this.tasksService.remove(Number(id));
  }
}
