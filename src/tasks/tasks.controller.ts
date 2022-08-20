import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get() // /tasks
  getAllTasks() {
    this.tasksService.getAllTasks();
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

  
  @Delete()
  deleteTask(@Body() taskId: string) {
    return this.tasksService.deleteTask(taskId);
  }
}
