import { Injectable } from '@nestjs/common';
import { v4 as uuid} from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import {Task, TaskStatus} from './task.model'

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[]{
        return this.tasks;
    }

    createTask(createTaskDto: CreateTaskDto): Task {
       const {title, description} = createTaskDto
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        };
        this.tasks.push(task);
        return task;
    }

    getTaskById(id: string){
        return this.tasks.find(task => task.id == id)
    }

    deleteTask(taskId: string){
        this.tasks= this.tasks.filter(row=>  row.id !== taskId);
        return 'Task deleted sucessfuly'
    }

    updateTaskStatus(taskId: string, status: TaskStatus){        
        let index = this.tasks.findIndex(obj => obj.id == taskId);
        this.tasks[index].status = status
        return this.tasks[index];
    }
}
