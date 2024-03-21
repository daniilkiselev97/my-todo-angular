import { Component } from '@angular/core';
import {
  IItem,
  Severity,
  TodoListService,
} from '../services/todo-list.service';

interface IFilters {
  completed: null | boolean;
  severity: null | Severity;
  searchText: string;
}

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent {
  filters: IFilters = {
    completed: null,
    severity: null,
    searchText: '',
  };

  constructor(public todoListService: TodoListService) {}

 
  showCompleted() {
    this.todoListService.tasks = this.todoListService.tasks.filter((task) => {
      return task.completed;
    });
  }

  addTask(title: string) {
    if (title) {
      this.todoListService.addTask(title);
    }
  }

  deleteTask(index: number) {
    this.todoListService.deleteTask(index);
  }

  changeTaskSeverity(index: number, severity: Severity) {
    this.todoListService.changeTaskSeverity(index, severity);
  }

  comleteTask(index: number) {
    this.todoListService.completeTask(index);
  }

  isMatchingFilters(task: IItem) {
    const filters = this.filters;
    return (
      (filters.searchText
        ? task.title.indexOf(filters.searchText) != -1
        : true) &&
      (filters.completed == null
        ? true
        : task.completed == filters.completed) &&
      (filters.severity == null ? true : task.severity == filters.severity)
    );
  }
}
