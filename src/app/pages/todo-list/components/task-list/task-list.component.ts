import { Component } from '@angular/core';
import {
  TodoListService,
} from '../../../../services/todo-list.service';
import { TodoItem, TodoItemSeverity } from 'src/app/models/todo.models';
import { TodoFilterCompleted, TodoFilterSeverity } from 'src/app/models/todo-filter.models';
import { TodoFilterService } from 'src/app/services/todo-filter.service';
import { Observable, tap } from 'rxjs';

interface IFilters {
  completed: null | boolean;
  severity: null | TodoItemSeverity;
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

  public tasksFiltered$: Observable<TodoItem[]> = this._todoFilterService.tasksFiltered$.pipe(
    tap(console.log)
  )
  public tasks$: Observable<TodoItem[]> = this._todoListService.tasks$;

  constructor(
    private _todoListService: TodoListService,
    private _todoFilterService: TodoFilterService
  ) {


    (window as any).todoListService = this._todoListService
  }

  setFilterCompleted(completed: TodoFilterCompleted): void {
    this._todoFilterService.changeFilterComplete(completed);
  }

  setFilterText(text: string): void {
    this._todoFilterService.changeFilterText(text);

  }

  setFilterSeverity(severity: TodoFilterSeverity) {
    this._todoFilterService.changeFilterSeverity(severity);
  }

  showCompleted() {
    this._todoFilterService.changeFilterComplete(true);
  }

  addTask(title: string) {
    if (title) {
      const subs = this._todoListService.addTask(title).subscribe(() => {
        subs.unsubscribe()
      })
    }
  }

  onInputFilterText(event: Event) {
    const inputNode = event.target as (HTMLInputElement | null);
    const filterText = inputNode?.value || '';
    // console.log(inputNode)
    this.setFilterText(filterText);

  }

  deleteTask(id: string) {
    const subs = this._todoListService.deleteTask(id).subscribe(() => {
      subs.unsubscribe();
    });
  }

  changeTaskSeverity(id: string, severity: TodoItemSeverity) {
    const subs = this._todoListService.changeTaskSeverity(id, severity).subscribe(() => {
    subs.unsubscribe();
    });
  }

  comleteTask(id: string, completed: boolean) {
    const subs = this._todoListService.changeTaskCompleted(id, completed).subscribe(() => {
      subs.unsubscribe();
    });
  }

  isMatchingFilters(task: TodoItem) {
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
