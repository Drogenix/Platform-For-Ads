import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { AdvertisementCardComponent } from '../../components/advertisement-card/advertisement-card.component';
import { AdvertisementsService } from '../../core/services/advertisements.service';
import { DropdownModule } from 'primeng/dropdown';
import { TreeModule } from 'primeng/tree';
import { TreeNode } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Advertisement } from '../../core/entities/advertisement';
import {
  BehaviorSubject,
  combineLatest,
  map,
  merge,
  Observable,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../core/services/categories.service';
import { Category } from '../../core/entities/category';
import { DialogModule } from 'primeng/dialog';
import { NotificationsService } from '../../core/services/notifications.service';

type SortOption = 'date' | 'price';

const SORT_OPTIONS = [
  {
    label: 'Новизне',
    option: 'date',
  },
  {
    label: 'Стоимости',
    option: 'price',
  },
];

@Component({
  selector: 'app-advertisements-search',
  standalone: true,
  imports: [
    AdvertisementCardComponent,
    DropdownModule,
    ProgressSpinnerModule,
    TreeModule,
    AsyncPipe,
    NgForOf,
    NgIf,
    DialogModule,
  ],
  templateUrl: './advertisements-search.component.html',
  styleUrls: ['./advertisements-search.component.css'],
})
export class AdvertisementsSearchComponent implements OnInit {
  readonly sortOptions = SORT_OPTIONS;
  showFiltersDialog: boolean = false;
  advertisements$: Observable<Advertisement[]>;
  categories$ = this.categoriesService
    .getAll()
    .pipe(map((categories) => this.convertCategoriesToTree(categories)));
  loading$ = new BehaviorSubject<boolean>(true);
  private _selectedCategorySubject = new Subject<string>();
  private _selectedSortOption = new BehaviorSubject<SortOption>('date');
  constructor(
    private advertisementsService: AdvertisementsService,
    private activatedRoute: ActivatedRoute,
    private categoriesService: CategoriesService,
    private notificationsService: NotificationsService
  ) {}

  ngOnInit(): void {
    const advertisementsByName$ = this.activatedRoute.queryParams.pipe(
      tap(() => this.loading$.next(true)),
      switchMap((params) => this.advertisementsService.getByName(params['s']))
    );

    const advertisementsByCategory$ = this._selectedCategorySubject
      .asObservable()
      .pipe(
        tap(() => this.loading$.next(true)),
        switchMap((categoryId) =>
          this.advertisementsService.getByCategoryId(categoryId)
        )
      );

    const sortOption$ = this._selectedSortOption.asObservable();

    const advertisements$ = merge(
      advertisementsByName$,
      advertisementsByCategory$
    ).pipe(tap(() => this.loading$.next(false)));

    this.advertisements$ = combineLatest(advertisements$, sortOption$).pipe(
      map(([advertisements, sortOption]) =>
        this._sortAdvertisements(advertisements, sortOption)
      )
    );
  }

  private _sortAdvertisements(
    advertisements: Advertisement[],
    sortOption: SortOption
  ): Advertisement[] {
    switch (sortOption) {
      case 'date':
        return advertisements.sort((a, b) => {
          if (a.createdAt < b.createdAt) return 1;
          if (a.createdAt > b.createdAt) return -1;

          return 0;
        });
      case 'price':
        return advertisements.sort((a, b) => {
          if (a.price < b.price) return 1;
          if (a.price > b.price) return -1;

          return 0;
        });
    }
  }

  private convertCategoriesToTree(categories: Category[]): TreeNode[] {
    const treeNodeArray: TreeNode[] = [];

    categories.forEach((category) => {
      const node: TreeNode = {
        key: category.id,
        label: category.name,
        selectable: true,
      };

      if (category.children) {
        node.children = this.convertCategoriesToTree(category.children);
      }

      treeNodeArray.push(node);
    });

    return treeNodeArray;
  }

  onCategorySelect(event: any) {
    const categoryId = event.node.key;

    if (categoryId) {
      this._selectedCategorySubject.next(categoryId);
    }
  }

  onSortOptionChange(event: any) {
    const value = event.value;

    this._selectedSortOption.next(value.option);

    this.notificationsService.showInfo('Объявления отсортированы');
  }

  toggleFilters() {
    this.showFiltersDialog = !this.showFiltersDialog;
  }
}
