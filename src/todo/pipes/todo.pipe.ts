import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { ToDoStatus } from '../models/todo.entity';

export class ToDoValidationPipe implements PipeTransform {
  readonly allowedStatus = [
    ToDoStatus.OPEN,
    ToDoStatus.WIP,
    ToDoStatus.COMPLETED,
  ];

  transform(value: any, metadata: ArgumentMetadata): any {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is an invalid status. `);
    }
    return value;
  }

  private isStatusValid(status: any) {
    const index = this.allowedStatus.indexOf(status);
    return index != -1;
  }
}
