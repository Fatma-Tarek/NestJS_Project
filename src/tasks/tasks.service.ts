import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid} from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-dilter.dto';
import {Task, TaskStatus} from './task.model'

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getAllTasks(): Task[]{
        return this.tasks;
    }

    getTasksWithFilters(filterDto: GetTasksFilterDto){
        const { status, search } = filterDto;
        let tasks = this.getAllTasks();

        if(status){
            tasks = tasks.filter(row=> {
                row.status == status;
            })
        }

        if(search){
            tasks = tasks.filter(row=> 
               row.title.includes(search) || row.description.includes(search))
        }

        return tasks;
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
        const found = this.tasks.find(task => task.id == id);
        console.log(found);
        
        if(!found){
            throw new NotFoundException(`Task with ID "${id}" not found`);
        }
        return found;
    }

    deleteTask(taskId: string){
        const found = this.getTaskById(taskId)
        this.tasks= this.tasks.filter(row=>  row.id !== found.id);
       // return 'Task deleted sucessfuly'
    }

    updateTaskStatus(taskId: string, status: TaskStatus){        
       // let index = this.tasks.findIndex(obj => obj.id == taskId);
       // this.tasks[index].status = status
       // return this.tasks[index];

       /*For Reusability*/
       const task = this.getTaskById(taskId);
       task.status = status;
       return task;

    }
}
