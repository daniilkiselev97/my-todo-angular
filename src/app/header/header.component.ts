import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { IsAuth, User } from '../models/auth.models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public authUser$: Observable<User | null> = this._authService.authUser$;
  public isAuth$: Observable<IsAuth> = this._authService.isAuth$;

  constructor(
    private readonly _authService: AuthService
  ) {}

  public logout(): void {
    this._authService.logout()
  }
}
