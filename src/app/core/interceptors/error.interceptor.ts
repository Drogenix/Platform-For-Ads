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

const URLS_TO_SHOW_ERROR = ['api/asfasfasf'];

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private errorService: ErrorService) {}

  private _handleError(error: HttpErrorResponse) {
    for (const url of URLS_TO_SHOW_ERROR) {
      const urlToCompare = url.toLowerCase();

      if (error.url?.toLowerCase().includes(urlToCompare)) {
        this.errorService.showError();
      }
    }
    return throwError(error);
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
