import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileService {
  constructor(private http:HttpClient) { }

  upload(file: File):Observable<string>{
    const fileData = new FormData()

    fileData.append('file', file, file.name)

    return this.http.post<string>('api/File', fileData).pipe(map(guid => 'http://cw47185.tw1.ru:5000/api/File/' + guid));
  }
}
