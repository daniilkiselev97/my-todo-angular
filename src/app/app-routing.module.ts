import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationComponent } from './pages/authorization/authorization.component';
import { DescriptionComponent } from './pages/description/description.component';
import { TodoListComponent } from './pages/todo-list/todo-list.component';
import { MyEmptyPageComponent } from './pages/my-empty-page/my-empty-page.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    component: TodoListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'about',
    component: DescriptionComponent,
    canActivate: [authGuard]

  },
  {
    path: 'login',
    component: AuthorizationComponent,
  },
  {
    path: 'signup',
    component: RegistrationComponent
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
