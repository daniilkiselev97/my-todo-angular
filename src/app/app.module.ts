import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from './task-item/task-item.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { DescriptionComponent } from './description/description.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { MyEmptyPageComponent } from './my-empty-page/my-empty-page.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskFormComponent,
    TaskListComponent,
    TaskItemComponent,
    AuthorizationComponent,
    HeaderComponent,
    DescriptionComponent,
    TodoListComponent,
    MyEmptyPageComponent,
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, CommonModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
