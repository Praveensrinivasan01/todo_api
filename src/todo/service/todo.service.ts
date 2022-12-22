import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/models/user.entity';
import { DeleteResult, Entity, Repository } from 'typeorm';
import { CreateToDoDto } from '../models/todo.dto';
import { ToDoEntity, ToDoStatus } from '../models/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(ToDoEntity)
    private toDoRepository: Repository<ToDoEntity>,
  ) {}

  async getAllToDos(user: UserEntity): Promise<ToDoEntity[]> {
    const query = await this.toDoRepository.createQueryBuilder('todos');
    query.where(`todos.userId = :userId`, { userId: user.id });
    try {
      return await query.getMany();
    } catch (err) {
      console.log(err);

      throw new NotFoundException('no todo found');
    }
  }

  async createToDo(
    createToDoDto: CreateToDoDto,
    user: UserEntity,
  ): Promise<ToDoEntity> {
    const todo = new ToDoEntity();
    const { title, description } = createToDoDto;
    todo.title = title;
    todo.description = description;
    todo.status = ToDoStatus.OPEN;
    todo.userId = user.id;
    this.toDoRepository.create(todo);
    try {
      return await this.toDoRepository.save(todo);
    } catch (err) {
      throw new InternalServerErrorException(
        'Sommenthing went wrong , todo not created',
      );
    }
  }

  async updateStatus(
    id: number,
    status: ToDoStatus,
    user: UserEntity,
  ): Promise<ToDoEntity> {
    // try {
      
    // } catch (err) {
    //   throw new InternalServerErrorException('Something went wrong');
    // }
    await this.toDoRepository.update({ id, userId: user.id }, { status });
      return this.toDoRepository.findOneBy({ id });
  }

  async deleteTodDos(
    id: number,
    user: UserEntity,
  ): Promise<DeleteResult | { success: boolean }> {
    const result = await this.toDoRepository.delete({ id, userId: user.id });
    if (!result.affected) {
      throw new NotFoundException('Todo not deleted');
    } else {
      return { success: true };
    }
  }
}
