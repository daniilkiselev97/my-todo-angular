import { Component,  OnInit,  } from '@angular/core';
import { IItem, TodoListService } from './services/todo-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(public todoListService: TodoListService){}
  title = 'Todo List';
  taskList:Array<IItem> = this.todoListService.tasks

 

  ngOnInit(): void {
      // if (localStorage.getItem('my_tasks')) {
      //   this.taskList = JSON.parse(localStorage.getItem('my_tasks')!);
      // }
  }


  // onComplete(task: any) {
  //   task.completed = true
  //   console.log('complete', task);
  //   this.httpService.updateTasks(task).subscribe(()=>{
  //     this.getAllTasks()


  //   })
  // }
  // onImportant(task: any) {
  //   task.important = true

  //   console.log('important', task);
  //   this.httpService.updateTasks(task).subscribe(()=>{
  //     this.getAllTasks()
      
  //   })
  // }
}
