import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TaskRepository {
  constructor(@InjectRepository(Task) private repository: Repository<Task>) {}

  addTask(task: Task): Promise<Task> {
    console.log(task);
    return this.repository.save(task);
  }

  async updateTask(id: number, attr: Partial<Task>): Promise<Task> {
    const task = await this.findOneBy(id);
    if (!task) {
      throw new NotFoundException(
        `Task with the required ID ${id} is not found`,
      );
    }

    Object.assign(task, attr);
    return await this.repository.save(task);
  }

  findOneBy(id: number): Promise<Task> {
    return this.repository.findOneBy({ id });
  }

  retriveTasks(): Promise<Task[]> {
    return this.repository.find();
  }

  async analyze() {
    return await this.repository
      .createQueryBuilder()
      .select([
        'count(id) as totalTasks',
        'sum(case when isCompleted = true then 1 else 0 end) as completedTasks',
        'sum(case when isCompleted = false then 1 else 0 end) as tasksInPipeline',
        `sum(case when createdAt >= now() - interval 7 day then 1 else 0 end) as tasksCreatedInLastSevenDays`,
        `sum(case when updatedAt >= now() - interval 7 day and isCompleted = true then 1 else 0 end) as tasksCompletedInLastSevenDays`,
      ])
      .getRawOne();
  }
}
