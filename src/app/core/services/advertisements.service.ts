import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BACKEND_URL} from "../../../main";
import {Observable} from "rxjs";
import {Advertisement} from "../entities/advertisement";

@Injectable({
  providedIn: 'root'
})
export class AdvertisementsService {

  private readonly _baseUrl: string = ''
  constructor(@Inject(BACKEND_URL) baseUrl: string, private _http:HttpClient) {
    this._baseUrl = baseUrl;
  }

  getAll():Observable<Advertisement[]> {
    return this._http.get<Advertisement[]>(this._baseUrl + 'Advert')
  }

  getById(id:string):Observable<Advertisement> {
    return this._http.get<Advertisement>(this._baseUrl + 'Advert/' + id)
  }
}
