import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  private readonly CLIENT_API_KEY = 'b17e30daead6797437aab70da81f62bd';
  private readonly UPLOAD_API = `https://api.imgbb.com/1/upload?key=${this.CLIENT_API_KEY}`;
  constructor(private http: HttpClient) {}

  upload(file: File): Observable<string> {
    const fileData = new FormData();
    fileData.append('image', file, file.name);

    return this.http.post<any>(this.UPLOAD_API, fileData).pipe(
      map((any) => {
        return any.data.url;
      })
    );
  }
}
