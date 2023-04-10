import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, switchMap, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {JwtHandlerService} from "./jwt-handler.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _isAuthSubject = new BehaviorSubject<boolean>(true);
  public isAuth$: Observable<boolean> = this._isAuthSubject.asObservable().pipe();
  constructor(private http:HttpClient, private jwtHandler:JwtHandlerService) {
  }

  private _setAuth(token:string){
    console.log(token)
    this.jwtHandler.setToken(token)
    this._isAuthSubject.next(true);
  }
  checkAuth(){
    if(this.jwtHandler.getToken()){
      this._isAuthSubject.next(true)
    }
  }

  auth(authType: 'login' | 'register' ,user:any):Observable<string>{
    const url = 'api/Account/'+ authType;

    return this.http.post<string>(url, user).pipe(
      switchMap(response => authType === 'register' ? this.http.post<string>('api/Account/login', user) : of(response)),
      tap(token => this._setAuth(token))
    )
  }

  logout(){
    this.jwtHandler.destroyToken();

    this._isAuthSubject.next(false);
  }
}
