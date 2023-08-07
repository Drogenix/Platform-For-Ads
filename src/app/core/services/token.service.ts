import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  destroyToken() {
    localStorage.removeItem('user');
  }

  setToken(token: string) {
    localStorage.setItem('user', token);
  }

  getToken(): string | null {
    return localStorage.getItem('user');
  }
}
