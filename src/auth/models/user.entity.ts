import { ToDoEntity } from 'src/todo/models/todo.entity';
import { TodoController } from 'src/todo/todo.controller';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column()
  salt: string;

  @OneToMany(() => ToDoEntity, (todo: ToDoEntity) => todo.user)
  todos: ToDoEntity[];
}
