import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BACKEND_URL} from "../../../main";
import {Observable} from "rxjs";
import {Response} from "../../entity/response";

@Injectable({
  providedIn: 'root'
})
export class AdvertisementsService {

  private readonly _baseUrl: string = ''
  constructor(@Inject(BACKEND_URL) baseUrl: string, private _http:HttpClient) {
    this._baseUrl = baseUrl;
  }

  getAll():Observable<Response> {
    return this._http.get<Response>(this._baseUrl + 'products?_quantity=16&_taxes=12')
  }
}
