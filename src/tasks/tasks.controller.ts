import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-dilter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto) {
    if(Object.keys(filterDto).length){
      console.log('filter');
        return this.tasksService.getTasksWithFilters(filterDto);
    }else{
        console.log('Get All tasks');
        return this.tasksService.getAllTasks();
    }
  }

  //createTask(@Body() body) {
  ////   createTask(
  ////     @Body('title') title: string,
  ////     @Body('description') description: string,
  ////   ) {
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string) {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTask(@Param('id') taskId: string) {
    return this.tasksService.deleteTask(taskId);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') taskId: string,
    //@Body('status') status: TaskStatus,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ) {
   // console.log(';;;;;;;;;;;;;;;;;;;;;');
    
   // console.log(updateTaskStatusDto);
    
    const {status} = updateTaskStatusDto;
    return this.tasksService.updateTaskStatus(taskId, status)
  }
}
