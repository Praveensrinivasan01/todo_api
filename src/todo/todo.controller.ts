import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/decorator/user.decorator';
import { UserEntity } from 'src/auth/models/user.entity';
import { CreateToDoDto } from './models/todo.dto';
import { ToDoStatus } from './models/todo.entity';
import { ToDoValidationPipe } from './pipes/todo.pipe';

import { TodoService } from './service/todo.service';

@Controller('todo')
@UseGuards(AuthGuard())
export class TodoController {
  constructor(private toDoService: TodoService) {}

  @Get()
  getAll(@User() user: UserEntity) {
    return this.toDoService.getAllToDos(user);
  }

  @Post()
  createTodo(
    @Body(ValidationPipe) data: CreateToDoDto,
    @User() user: UserEntity,
  ) {
    const { title, description } = data;
    console.log(data, title, description);
    return this.toDoService.createToDo(data, user);
  }

  @Patch(':id')
  updateTodo(
    @Body('status', ToDoValidationPipe) status: ToDoStatus,
    @Param('id') id: number,
    @User() user: UserEntity,
  ) {
    return this.toDoService.updateStatus(id, status, user);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: number, @User() user: UserEntity) {
    return this.toDoService.deleteTodDos(id, user);
  }
}
