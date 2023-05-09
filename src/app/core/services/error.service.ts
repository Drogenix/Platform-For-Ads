import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private _errorSubject = new BehaviorSubject<boolean>(false);
  error$ = this._errorSubject.asObservable();
  showError() {
    this._errorSubject.next(true);
  }
}
