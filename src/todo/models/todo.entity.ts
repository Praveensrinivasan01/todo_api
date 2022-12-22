import { UserEntity } from 'src/auth/models/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('todos')
export class ToDoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: ToDoStatus;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.todos)
  user: UserEntity;
  @Column()
  userId: number;
}

export enum ToDoStatus {
  OPEN = 'OPEN',
  WIP = 'WIP',
  COMPLETED = 'COMPLETED',
}
