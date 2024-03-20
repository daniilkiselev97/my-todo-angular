import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IItem } from '../services/todo-list.service';

@Component({
  selector: 'task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  @Input()
  task!: IItem;

  @Output()
  deleteItem = new EventEmitter();

  @Output()
  changeTaskSeverity = new EventEmitter();
  toggleTaskSeverity() {
    let newSeverity;
    if (this.task.severity == 'important') {
      newSeverity = 'usual';
    } else {
      newSeverity = 'important';
    }
    this.changeTaskSeverity.emit(newSeverity);
  }

  @Output()
  deleteTask = new EventEmitter()



  @Output()
  completeTask = new EventEmitter();
  toggleTaskComplete() {
    this.completeTask.emit(!this.task.completed);
  }
}
