import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class JwtHandlerService {
  private isTokenExpired(token: string): boolean {
    const decodedToken: any = jwtDecode(token);

    const expired = decodedToken.exp * 1000;

    return expired < Date.now();
  }

  destroyToken() {
    localStorage.removeItem('nek');
  }

  setToken(token: string) {
    localStorage.setItem('nek', token);
  }

  getToken(): string | null {
    const token = localStorage.getItem('nek');

    if (token) {
      return !this.isTokenExpired(token) ? token : null;
    }

    return null;
  }
}
