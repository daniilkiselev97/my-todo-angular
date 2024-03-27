import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TaskFormComponent } from './pages/todo-list/components/task-form/task-form.component';
import { TaskListComponent } from './pages/todo-list/components/task-list/task-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from './pages/todo-list/components/task-item/task-item.component';
import { AuthorizationComponent } from './pages/authorization/authorization.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { DescriptionComponent } from './pages/description/description.component';
import { TodoListComponent } from './pages/todo-list/todo-list.component';
import { MyEmptyPageComponent } from './pages/my-empty-page/my-empty-page.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MeetupsComponent } from './pages/meetups/meetups.component';

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
    RegistrationComponent,
    MeetupsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
