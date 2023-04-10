import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../entities/category";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private http:HttpClient) {}
  getById(id:string):Observable<Category> {
    return this.http.get<Category>('api/Category/' + id)
  }
}
