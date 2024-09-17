import { Body, Post, Patch, Controller, Get, Put, Param } from '@nestjs/common';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Controller('/task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post('/add')
  addTask(@Body() task: Task) {
    return this.taskService.addTask(task);
  }

  @Put('/update/:id')
  updateTask(@Param('id') id: string, @Body() task: Task) {
    return this.taskService.updateTask(parseInt(id), task);
  }

  @Get('/getTasks/:id?')
  retriveTasks(@Param('id') id: string) {
    return this.taskService.retriveTasks(parseInt(id));
  }

  @Get('/analyze')
  analyze() {
    return this.taskService.analyze();
  }
}
