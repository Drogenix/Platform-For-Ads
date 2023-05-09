import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
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

  getByName(name: string): Observable<Advertisement[]> {
    return this.getAll().pipe(
      map((advertisements) =>
        advertisements.filter((advertisement) =>
          advertisement.name.toLowerCase().includes(name.toLowerCase())
        )
      )
    );
  }

  getByCategoryId(id: string): Observable<Advertisement[]> {
    return this.http
      .get<Advertisement[]>('/assets/mock-advertisements.json')
      .pipe(
        map((advertisements) =>
          advertisements.filter(
            (advertisement) => advertisement.categoryId === id
          )
        )
      );
  }
}
