import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtHandlerService {

  constructor() { }
  destroyToken(){
    localStorage.removeItem('nek')
  }

  setToken(token:string){
    localStorage.setItem('nek', token)
  }

  getToken():string | null{
    const token  = localStorage.getItem('nek')

    if(!token) return token

    return null;
  }
}
