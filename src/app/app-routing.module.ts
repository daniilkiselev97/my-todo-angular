import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationComponent } from './authorization/authorization.component';
import { DescriptionComponent } from './description/description.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { MyEmptyPageComponent } from './my-empty-page/my-empty-page.component';

const routes: Routes = [
  {
    path: 'home',
    component: TodoListComponent,
  },
  {
    path: 'about',
    component: DescriptionComponent,
  },
  {
    path: 'auth',
    component: AuthorizationComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: MyEmptyPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
