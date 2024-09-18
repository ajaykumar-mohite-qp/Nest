import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { Repository, Timestamp } from 'typeorm';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskService {
  constructor(private taskRepository: TaskRepository) {}

  async addTask(task: Task) {
    console.log('TaskService .. adding the task into the DB ');

    return await this.taskRepository.addTask(task);
  }

  async updateTask(id: number, task: Partial<Task>) {
    return await this.taskRepository.updateTask(id, task);
  }

  async retriveTask(id: number) {
    if (id) {
      const task = await this.taskRepository.findOneBy(id);
      if (!task) {
        throw new NotFoundException(
          `Task with the required ID ${id} is not found`,
        );
      }
      return task;
    }
  }

  async retriveAllTasks() {
    return await this.taskRepository.retriveTasks();
  }

  analyze() {
    return this.taskRepository.analyze();
    // const tasks = await this.taskRepository.retriveTasks();

    // const totalTasks = tasks.length;
    // const completedTasks = tasks.filter(($) => $.isCompleted).length;
    // const tasksInPipeline = tasks.filter(($) => !$.isCompleted).length;

    // return {
    //   totalTasks,
    //   completedTasks,
    //   tasksInPipeline,
    // };
  }
}
