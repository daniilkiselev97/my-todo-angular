import { Component,  OnInit,  } from '@angular/core';
import { IItem, TodoListService } from './services/todo-list.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  title = 'Todo List';
  taskList:Array<IItem> = this.todoListService.tasks
  
  constructor(
    public todoListService: TodoListService,
    private readonly _authService: AuthService
  ){}

  ngOnInit(): void {
    // this._authService.login({
    //   "email": "abc@yandex.ru",
    //   "password": "abc",
    // } as any).subscribe();

    this._authService.authUser$.subscribe(console.log)
  }


  
}
