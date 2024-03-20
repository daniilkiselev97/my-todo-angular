import { Injectable } from '@angular/core';

export type Severity = 'important' | 'usual';

export interface IItem {
  title: string;
  severity: Severity;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  public tasks: Array<IItem> = [];
  addTask(task: string) {
    this.tasks.push({
      title: task,
      completed: false,
      severity: 'usual',
    });
  }
  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }
  changeTaskSeverity(index: number, severity: Severity) {
    this.tasks[index].severity = severity;
  }
  completeTask(index: number) {
    this.tasks[index].completed = !this.tasks[index].completed;
    
  }

  constructor() {}
}
