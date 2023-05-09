import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { ErrorService } from '../services/error.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private errorService: ErrorService) {}

  private _handleError(error: HttpErrorResponse) {
    if (error.status === 504) {
      this.errorService.showError();
    }
    return throwError(() => error.message);
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((err) => this._handleError(err))
    );
  }
}
