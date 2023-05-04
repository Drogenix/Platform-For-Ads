import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JwtHandlerService {
  destroyToken() {
    localStorage.removeItem('nek');
  }

  setToken(token: string) {
    localStorage.setItem('nek', token);
  }

  getToken(): string | null {
    return localStorage.getItem('nek');
  }
}
