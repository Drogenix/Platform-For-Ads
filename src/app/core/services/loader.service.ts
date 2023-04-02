import { Injectable } from '@angular/core';
import {delay, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private _loaderSubject = new Subject<boolean>()
  loading$ = this._loaderSubject.asObservable().pipe(delay(0));
  constructor() { }

  show(){
    this._loaderSubject.next(true);
  }

  hide(){
    this._loaderSubject.next(false);
  }
}
