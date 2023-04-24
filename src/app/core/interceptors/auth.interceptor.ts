import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {JwtHandlerService} from "../services/jwt-handler.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private jwtHandler:JwtHandlerService) {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.jwtHandler.getToken()

    return token ? next.handle(request.clone({headers:request.headers.set('Bearer', token)})) : next.handle(request);
  }
}
