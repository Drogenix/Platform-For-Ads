import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  map,
  Observable,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { API_URL } from '../../app.component';
import { User } from '../entities/user';
import { AuthUser } from '../entities/auth-user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _isAuthSubject = new BehaviorSubject<boolean>(false);
  public isAuth$: Observable<boolean> = this._isAuthSubject.asObservable();
  public user: User | null;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  private _setAuth(user: User) {
    this._updateUserToken(user);

    this._isAuthSubject.next(true);
  }

  private _updateUserToken(user: User) {
    const token = JSON.stringify(user);

    this.tokenService.setToken(token);

    this.user = user;
  }

  private _createUser(user: AuthUser): Observable<User> {
    return this.http
      .post<User>(`${API_URL}/users`, user)
      .pipe(switchMap((newUser) => this.login(newUser)));
  }

  private isUserExists(users: AuthUser[], userToCompare: AuthUser): boolean {
    const user = users.find((user) => user.phone === userToCompare.phone);

    return !!user;
  }

  checkAuth() {
    const token = this.tokenService.getToken();

    if (token) {
      this._isAuthSubject.next(true);

      this.user = JSON.parse(token);
    }
  }

  getUserPhone(userId: string): Observable<string> {
    return this.http.get<User[]>(`${API_URL}/users?id=` + userId).pipe(
      map((users) => {
        return users[0].phone;
      })
    );
  }

  updateUser(user: User): Observable<User> {
    return this.http
      .put<User>(`${API_URL}/users/` + this.user?.id, user)
      .pipe(tap((user) => this._updateUserToken(user)));
  }

  private _isCurrentPasswordValid(password: string): Observable<AuthUser> {
    return this.http.get<AuthUser>(`${API_URL}/users/` + this.user?.id).pipe(
      switchMap((user) => {
        if (user.password === password) return of(user);

        return throwError(() => 'Вы ввели неправильный текущий пароль.');
      })
    );
  }

  updateUserPass(
    currentPassword: string,
    newPassword: string
  ): Observable<User> {
    return this._isCurrentPasswordValid(currentPassword).pipe(
      switchMap(() =>
        this.http.put<User>(`${API_URL}/users/` + this.user?.id, {
          password: newPassword,
        })
      )
    );
  }

  login(user: any): Observable<User> {
    return this.http
      .get<User[]>(
        `${API_URL}/users?phone=${user.phone}&password=${user.password}`
      )
      .pipe(
        switchMap((user) => {
          if (user[0] != null) return of(user[0]);

          return throwError(
            () => 'Неправильный логин или пароль. Попробуйте снова'
          );
        }),
        tap((user) => this._setAuth(user))
      );
  }

  register(user: any): Observable<User> {
    const url = encodeURI(`${API_URL}/users`);

    return this.http.get<AuthUser[]>(url).pipe(
      switchMap((users) => {
        debugger;
        if (this.isUserExists(users, user)) {
          return throwError(() => 'Данный номер телефона уже зарегистрирован');
        }
        return this._createUser(user);
      })
    );
  }

  logout() {
    this.user = null;
    this.tokenService.destroyToken();
    this._isAuthSubject.next(false);
  }
}
