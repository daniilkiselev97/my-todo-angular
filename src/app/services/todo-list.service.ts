import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, switchMap, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TodoItem, TodoItemSeverity } from '../models/todo.models';

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  private _baseUrl: string = `${environment.jsonServerOrigin}/tasks`;
  private _stateTasks: BehaviorSubject<TodoItem[]> = new BehaviorSubject<TodoItem[]>([]);
  public tasks$: Observable<TodoItem[]> = this._stateTasks.asObservable();

  constructor(private _http: HttpClient) {
    this._init();
  }

  public addTask(task: string): Observable<TodoItem[]> {
    return this._http.post<TodoItem>(this._baseUrl, {
      title: task,
      completed: false,
      severity: 'usual',
    }).pipe(
      catchError((err) => throwError(() => {
        console.error(err);
        return new Error('Добавить элемент не удалось');
      })),
      switchMap(() => this._getAll()) //переключится на другой поток, обновить состояние
    );
  }

  public deleteTask(id: string) {
    return this._http.delete<{}>(`${this._baseUrl}/${id}`).pipe(
      catchError((err) => throwError(() => {
        console.error(err);
        return new Error('Удалить элемент не удалось');
      })),
      switchMap(() => this._getAll()) 
    )
  }


  public changeTaskSeverity(id: string, severity: TodoItemSeverity) {
    const task = this._getSyncTask(id);

    if (task === null) {
      throw new Error(`Задача ${id} не найдена `);
    }

    return this._http.patch(`${this._baseUrl}/${id}`, { //частиное изменение
      ...task,
      severity: severity
    }).pipe(
      catchError((err) => throwError(() => {
        console.error(err);
        return new Error('Изменить важность элемента не удалось');
      })),
      switchMap(() => this._getAll()) 

    )
  }

  public changeTaskCompleted(id: string, completed: boolean) {
    const task = this._getSyncTask(id);

    if (task === null) {
      throw new Error(`Задача ${id} не найдена `);
    }

    return this._http.patch(`${this._baseUrl}/${id}`, { //частиное изменение
      ...task,
      completed: completed
    }).pipe(
      catchError((err) => throwError(() => {
        console.error(err);
        return new Error('Изменить завершенность элемента не удалось');
      })),
      switchMap(() => this._getAll()) 

    )

  }

  private _init(): void {
    const subs = this._getAll().subscribe(() => {
      subs.unsubscribe();
    });

  }

  private _getSyncTask(id: string): TodoItem | null {
    const task = this._stateTasks.value.find((task) => task.id === id);
    return task || null; 
  }


  private _syncUpdateTasks(tasks: TodoItem[]): void {
    this._stateTasks.next(tasks);
  }

  private _getAll(): Observable<TodoItem[]> {
    return this._http.get<TodoItem[]>(this._baseUrl).pipe(
      catchError((err) => throwError(() => {
        console.error(err);
        return new Error('Получить элементы не удалось');
      })),
      tap((tasks) => this._syncUpdateTasks(tasks))
    )
  }

}
