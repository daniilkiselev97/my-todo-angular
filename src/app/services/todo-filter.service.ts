import { Injectable } from '@angular/core';
import { TodoListService } from './todo-list.service';
import { BehaviorSubject, Observable, Subscriber, Subscription, combineLatest, filter, of, switchMap } from 'rxjs';
import { TodoItem, TodoItemSeverity } from '../models/todo.models';
import { TodoFilter, TodoFilterCompleted, TodoFilterSeverity } from '../models/todo-filter.models';

@Injectable({
  providedIn: 'root'
})
export class TodoFilterService {
  private _tasksFilteredState: BehaviorSubject<TodoItem[]> = new BehaviorSubject<TodoItem[]>([]);
  private _filterState: BehaviorSubject<TodoFilter> = new BehaviorSubject<TodoFilter>({
    completed: null,
    severity: null,
    searchText: '',
  });
  private _subscription: Subscription = new Subscription(); //одна подписка для всех подписок
  public tasksFiltered$: Observable<TodoItem[]> = this._tasksFilteredState.asObservable();

  constructor(
    private readonly _todoListService: TodoListService,
  ) {
    this._init();
  }

  public changeFilterText(searchText: string): void {
    this._filterState.next({
      ...this._filterState.value,
      searchText
    });
  }

  public changeFilterSeverity(severity: TodoFilterSeverity): void {
    // console.log(severity, 'changeFilterSeverity')
    this._filterState.next({
      ...this._filterState.value,
      severity
    });
  }

  public changeFilterComplete(completed: TodoFilterCompleted): void {
    this._filterState.next({
      ...this._filterState.value,
      completed
    });
  }

  private _init(): void {
    combineLatest([//слушает 2 потока и если что то изменяется в одном из потоков то заново запускает subscribe
      this._todoListService.tasks$,
      this._filterState
    ]).subscribe(([tasks, filter]) => {
      this._updateSyncFilteredTasks(tasks, filter);
    })
    
  }

  private _filterTasks(tasks: TodoItem[], filter: TodoFilter): TodoItem[] {
    return tasks.filter(task => (
      filter.searchText
      ? task.title.indexOf(filter.searchText) != -1
      : true) &&
    (filter.completed == null
      ? true
      : task.completed == filter.completed) &&
    (filter.severity == null ? true : task.severity == filter.severity));
  }

  private _updateSyncFilteredTasks(unfilteredTasks: TodoItem[], filter: TodoFilter): void {
    const filteredTasks = this._filterTasks(unfilteredTasks, filter);

    this._tasksFilteredState.next(filteredTasks);
  }











}
