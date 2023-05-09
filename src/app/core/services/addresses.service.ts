import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddressesResponse } from '../entities/addresses-response';

const API_URL =
  'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';

const API_KEY = '6e97f704d0b15235a9a48c2b4246c6b8d5c663c3';

@Injectable({
  providedIn: 'root',
})
export class AddressesService {
  constructor(private http: HttpClient) {}
  getAddresses(value: string | null): Observable<AddressesResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Token ' + API_KEY,
      }),
    };

    return this.http.post<AddressesResponse>(
      API_URL,
      { query: value },
      httpOptions
    );
  }
}
