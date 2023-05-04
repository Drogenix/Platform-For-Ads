import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Advertisement } from '../entities/advertisement';

@Injectable({
  providedIn: 'root',
})
export class AdvertisementsService {
  constructor(private http: HttpClient) {}

  create(advertisement: Advertisement): Observable<Advertisement> {
    return this.http.post<Advertisement>('api/Advert', advertisement);
  }

  getAll(): Observable<Advertisement[]> {
    return this.http.get<Advertisement[]>('api/Advert');
  }

  getById(id: string): Observable<Advertisement> {
    return this.http.get<Advertisement>('api/Advert/' + id);
  }
}
