import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';

import { TodoService } from './service/todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDoEntity } from './models/todo.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtCustomStrategy } from 'src/auth/jwt.custom.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([ToDoEntity]), AuthModule],

  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
