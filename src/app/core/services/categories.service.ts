import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Category } from '../entities/category';
import { API_URL } from '../../app.component';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  private _getCategoryChildren(
    parentId: string,
    categories: Category[]
  ): Category[] {
    const childCategories: Category[] = [];

    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];

      if (parentId === category.parentId) {
        category.children = this._getCategoryChildren(category.id, categories);
        childCategories.push(category);
      }
    }

    return childCategories;
  }

  private _collectCategories(categoriesTree: Category[]): Category[] {
    const parentCategories: Category[] = [];

    for (let i = 0; i < categoriesTree.length; i++) {
      const category = categoriesTree[i];

      if (!category.parentId) {
        parentCategories.push(category);
      }
    }

    parentCategories.forEach((parent) => {
      parent.children = this._getCategoryChildren(parent.id, categoriesTree);
    });

    return parentCategories;
  }

  getById(id: string): Observable<Category> {
    return this.http
      .get<Category[]>(`${API_URL}/categories?id=` + id)
      .pipe(map((response) => response[0]));
  }

  getAll(): Observable<Category[]> {
    return this.http
      .get<Category[]>(`${API_URL}/categories`)
      .pipe(map((categories) => this._collectCategories(categories)));
  }
}
