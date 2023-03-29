import { Injectable } from '@angular/core';
import {BehaviorSubject, shareReplay} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _isAuthSubject = new BehaviorSubject<boolean>(false);

  public isAuth$ = this._isAuthSubject.asObservable().pipe(shareReplay())
  constructor() { }
}
