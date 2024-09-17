import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TaskRepository } from './task.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: 'task_management_system',
      entities: [Task],
      username: 'sadev',
      password: 'sadevpw',
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Task]),
  ],
  controllers: [AppController, TaskController],
  providers: [AppService, TaskService, TaskRepository],
})
export class AppModule {}
