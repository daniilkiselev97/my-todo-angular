import { Component,  OnInit,  } from '@angular/core';
import { AuthService } from './services/auth.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent  {
  title = 'Todo List';
  
  constructor(
    private readonly _authService: AuthService
  ){}

  ngOnInit(): void {
    // this._authService.login({
    //   "email": "abc@yandex.ru",
    //   "password": "abc",
    // } as any).subscribe();

    // this._authService.authUser$.subscribe(console.log);
  }
}
 

