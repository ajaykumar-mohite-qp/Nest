import { Injectable } from '@nestjs/common';
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

  async updateTask(id: number, task: Task) {
    return await this.taskRepository.updateTask(id, task);
  }

  async retriveTasks(id: number) {
    if (id) {
      return await this.taskRepository.findOneBy(id);
    }
    return await this.taskRepository.retriveTasks();
  }

  async analyze() {
    return await this.taskRepository.analyze();
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
