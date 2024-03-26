import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationComponent } from './pages/authorization/authorization.component';
import { DescriptionComponent } from './pages/description/description.component';
import { TodoListComponent } from './pages/todo-list/todo-list.component';
import { MyEmptyPageComponent } from './pages/my-empty-page/my-empty-page.component';

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
    path: 'login',
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
