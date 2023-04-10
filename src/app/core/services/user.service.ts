import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {BACKEND_URL} from "../../../main";
import {JwtHandlerService} from "./jwt-handler.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _baseUrl: string;
  private _isAuthSubject = new BehaviorSubject<boolean>(false);
  public isAuth$: Observable<boolean> = this._isAuthSubject.asObservable().pipe();
  constructor(@Inject(BACKEND_URL) private baseUrl:string, private router:Router, private http:HttpClient, private jwtHandler:JwtHandlerService) {
    this._baseUrl = baseUrl;
  }

  private _setAuth(token:string){
    this.jwtHandler.setToken(token)
    this._isAuthSubject.next(true);
  }

  auth(user:any):Observable<string>{
    user.login = '+7'+user.login
    return this.http.post(this._baseUrl + 'Account/login', user, {responseType:'text'}).pipe(tap(tkn => this._setAuth(tkn)))
  }

  logout(){
    this._isAuthSubject.next(false);

    this.jwtHandler.destroyToken();

    this.router.navigate(['']);
  }
}
