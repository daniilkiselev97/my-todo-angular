import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthToken, IsAuth, User, UserLogin, UserRegistrationData } from '../models/auth.models';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import { Route, Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _localStorageKey: string = 'token';
  private readonly _baseUrl: string = `${environment.backendOrigin}/auth`;
  private readonly _stateAuthUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public readonly authUser$: Observable<User | null> = this._stateAuthUser.asObservable();
  public readonly isAuth$: Observable<IsAuth> = this._stateAuthUser.pipe(
    map((user) => { 
      if (user === null) return { isAuth: false };
      // console.log(user)
      return { isAuth: true };
    })
  );

  get token(): string | null {
    return this._localStorageService.get<string>(this._localStorageKey);
  }

  constructor(
    private readonly _http: HttpClient,
    private readonly _localStorageService: LocalStorageService,
    private _router: Router
  ) {
    this._init();
  }
  
  public login(user: UserLogin): Observable<AuthToken> {
    return this._http.post<AuthToken>(`${this._baseUrl}/login`, user).pipe(
      catchError((err) => this.catchErrorFunc(err)),
      tap(({token}) => {
        this._syncLogin(token, true);
        this._router.navigateByUrl('home');
      })
    )
  }

  public signup(user: UserRegistrationData): Observable<AuthToken> {
    return this._http.post<AuthToken>(`${this._baseUrl}/registration`, user).pipe(
      catchError((err) => this.catchErrorFunc(err)),
      tap(({token}) => {
        this._syncLogin(token, true);
        this._router.navigateByUrl('home');
      })
    )
  }


  public logout(): void {
    this._stateAuthUser.next(null);
    this._localStorageService.delete(this._localStorageKey);
    this._router.navigateByUrl('login');
  }


  private _init(): void {
    const token = this._localStorageService.get(this._localStorageKey);

    if (token !== null) {
      this._syncLogin(token, false);
    }
  }

  private _syncLogin(token: string, updatedLocalStorage: boolean): void {
    const user = this._getUserFromToken(token)

    this._stateAuthUser.next(user) 
    if (updatedLocalStorage === true) {
      this._localStorageService.set(this._localStorageKey, token);
    }
  }

  
  //TODO : функция должна возвращать пользователя из токена или null. Ошибок при выполнении функции не должно возникать
  private _getUserFromToken(token: string)  {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  }

  private catchErrorFunc(err: any) {
    return throwError(() => {
      const createMessageError = (err: any) => {
        if (Array.isArray(err.error)) return err.error.join(', ');
        if (typeof err.error === 'object' && err.error.message) return err.error.message;
        if (err.error instanceof ProgressEvent) return err.message;
        return 'Непредвиденная ошибка';
      };
      const message = createMessageError(err);
      console.error(err);
      return new Error(`Ошибка при регистрации: ${message}`);
    });

  }

}