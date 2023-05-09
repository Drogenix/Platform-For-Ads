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

const SORT_OPTIONS = [
  {
    label: 'Новизне',
  },
  {
    label: 'Стоимости',
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
  ],
  templateUrl: './advertisements-search.component.html',
  styleUrls: ['./advertisements-search.component.css'],
})
export class AdvertisementsSearchComponent implements OnInit {
  readonly sortOptions = SORT_OPTIONS;
  isMenuVisible: boolean = false;
  selectedCategory: TreeNode;
  advertisements$: Observable<Advertisement[]>;
  categories$ = this.categoriesService
    .getAll()
    .pipe(map((categories) => this.convertCategoriesToTree(categories)));
  loading$ = new BehaviorSubject<boolean>(true);
  private _selectedCategorySubject = new Subject<string>();

  constructor(
    private advertisementsService: AdvertisementsService,
    private activatedRoute: ActivatedRoute,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    const advertisementsFromSearch$ = this.activatedRoute.queryParams.pipe(
      tap(() => this.loading$.next(true)),
      switchMap((params) => this.advertisementsService.getByName(params['s']))
    );

    const selectedCategoryAdvertisement$ = this._selectedCategorySubject
      .asObservable()
      .pipe(
        tap(() => this.loading$.next(true)),
        switchMap((categoryId) =>
          this.advertisementsService.getByCategoryId(categoryId)
        )
      );

    this.advertisements$ = merge(
      advertisementsFromSearch$,
      selectedCategoryAdvertisement$
    ).pipe(tap(() => this.loading$.next(false)));
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

  onCategorySelect() {
    const categoryId = this.selectedCategory.key;

    if (categoryId) {
      this._selectedCategorySubject.next(categoryId);
    }
  }

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }
}
