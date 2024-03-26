import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IItem, TodoListService } from '../../../../services/todo-list.service';

@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent {
  newTitle!: string;
  constructor() {}

  @Output()
  createItem = new EventEmitter<any>();
}
