import {
  Body,
  Post,
  Patch,
  Controller,
  Get,
  Put,
  Param,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { Task } from './task.entity';
import { TaskService } from './task.service';
import { UpdateTaskDto } from './update-task.dto';

@Controller('/task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post('/add')
  addTask(@Body() task: Task) {
    return this.taskService.addTask(task);
  }

  @Put('/update/:id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTaskDto,
  ) {
    return this.taskService.updateTask(id, body);
  }

  @Get('/getTasks/:id?')
  retriveTasks(@Param('id') id: string) {
    if (id && isNaN(Number(id))) {
      throw new BadRequestException('Please enter a valid parameter');
    }
    if (id) {
      return this.taskService.retriveTask(parseInt(id));
    }
    return this.taskService.retriveAllTasks();
  }

  @Get('/analyze')
  analyze() {
    return this.taskService.analyze();
  }
}
