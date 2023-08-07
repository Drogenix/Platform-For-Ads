import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Advertisement } from '../entities/advertisement';
import { API_URL } from '../../app.component';
import { UserService } from './user.service';
import { CategoriesService } from './categories.service';
import { combineLatest, map, Observable } from 'rxjs';
import { Category } from '../entities/category';

@Injectable({
  providedIn: 'root',
})
export class AdvertisementsService {
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private categoriesService: CategoriesService
  ) {}

  create(advertisement: Advertisement): Observable<Advertisement> {
    if (this.userService.user) {
      advertisement.userId = this.userService.user.id;
    }
    return this.http.post<Advertisement>(
      `${API_URL}/advertisements`,
      advertisement
    );
  }

  getAll(): Observable<Advertisement[]> {
    return this.http.get<Advertisement[]>(`${API_URL}/advertisements`);
  }

  getUserAdvertisements(): Observable<Advertisement[]> {
    const userId = this.userService.user?.id;
    return this.http.get<Advertisement[]>(
      `${API_URL}/advertisements?userId=${userId}`,
      { headers: { 'content-type': 'application/json' } }
    );
  }

  getById(id: string): Observable<Advertisement> {
    return this.http.get<Advertisement>(`${API_URL}/advertisements/` + id);
  }

  getByName(name: string): Observable<Advertisement[]> {
    return this.http.get<Advertisement[]>(
      `${API_URL}/advertisements?name=` + name
    );
  }

  getByCategoryId(categoryId: string): Observable<Advertisement[]> {
    const categories$ = this.categoriesService.getAll();

    const advertisements$ = this.getAll();

    return combineLatest(categories$, advertisements$).pipe(
      map(([categories, advertisements]) =>
        this._getChildrenCategoryAdvertisements(
          categoryId,
          categories,
          advertisements
        )
      )
    );
  }

  private _gth(parentId: string, categories: Category[]): string[] {
    debugger;

    let neededCategories: string[] = [];

    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];

      let categoryId = parentId;

      if (category.id === parentId || category.parentId === parentId) {
        neededCategories.push(category.id);

        categoryId = category.id;
      }

      neededCategories = neededCategories.concat(
        this._checkChildren(categoryId, category)
      );
    }

    return neededCategories;
  }

  private _checkChildren(categoryId: string, category: Category): string[] {
    if (category.children && category.children.length > 0) {
      return this._gth(categoryId, category.children);
    }

    return [];
  }

  private _getChildrenCategoryAdvertisements(
    parentId: string,
    categories: Category[],
    advertisements: Advertisement[]
  ): Advertisement[] {
    const advertisementsCategories = this._gth(parentId, categories);

    const allAdvertisements: Advertisement[] = [];

    for (let i = 0; i < advertisements.length; i++) {
      for (let k = 0; k < advertisementsCategories.length; k++) {
        if (advertisements[i].categoryId === advertisementsCategories[k]) {
          allAdvertisements.push(advertisements[i]);
        }
      }
    }

    return allAdvertisements;
  }
}
