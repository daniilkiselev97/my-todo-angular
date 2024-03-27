import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoItem } from 'src/app/models/todo.models';

@Component({
  selector: 'task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent {


  @Input()
  task!: TodoItem;

  @Output()
  deleteItem = new EventEmitter();

  @Output()
  changeTaskSeverity = new EventEmitter();


 

  @Output()
  deleteTask = new EventEmitter();

  @Output()
  completeTask = new EventEmitter();

  constructor(
    // private _todoService
  ) {

  }

  toggleTaskComplete() {
    this.completeTask.emit(!this.task.completed);
  }

  toggleTaskSeverity() {
    let newSeverity;
    if (this.task.severity == 'important') {
      newSeverity = 'usual';
    } else {
      newSeverity = 'important';
    }
    this.changeTaskSeverity.emit(newSeverity);
  }
}
