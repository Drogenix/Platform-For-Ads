import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, switchMap, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {JwtHandlerService} from "./jwt-handler.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _isAuthSubject = new BehaviorSubject<boolean>(false);
  public isAuth$: Observable<boolean> = this._isAuthSubject.asObservable();

  constructor(private http:HttpClient, private jwtHandler:JwtHandlerService) {}

  private _setAuth(token:string) {
    this.jwtHandler.setToken(token)
    this._isAuthSubject.next(true);
  }

  checkAuth(){
    if(this.jwtHandler.getToken()){
      this._isAuthSubject.next(true)
    }
  }

  login(user:any):Observable<string>{
    return this.http.post<string>('api/Account/login', user).pipe(
      tap(token => this._setAuth(token))
    )
  }

  register(user:any):Observable<string>{
    return this.http.post<string>('api/Account/register', user).pipe(
      switchMap(()=> this.login(user))
    )
  }

  logout(){
    this.jwtHandler.destroyToken();

    this._isAuthSubject.next(false);
  }
}
