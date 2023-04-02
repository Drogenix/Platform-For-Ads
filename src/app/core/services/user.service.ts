import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _isAuthSubject = new BehaviorSubject<boolean>(true);
  public isAuth$: Observable<boolean> = this._isAuthSubject.asObservable().pipe();
  constructor(private router:Router) {
    console.log('UserService were created')
  }

  logout(){
    this._isAuthSubject.next(false);
    this.router.navigate(['']);
  }
}
