import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SlideMenuModule } from 'primeng/slidemenu';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OverlayModule } from 'primeng/overlay';
import { AsyncPipe, NgIf } from '@angular/common';
import { CategoriesMenuComponent } from '../categories-menu/categories-menu.component';
import { TreeModule } from 'primeng/tree';
import { CategoriesService } from '../../core/services/categories.service';
import { map, Observable } from 'rxjs';
import { AutoFocusModule } from 'primeng/autofocus';
import { TreeNode } from 'primeng/api';
import { Category } from '../../core/entities/category';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  imports: [
    SlideMenuModule,
    ReactiveFormsModule,
    OverlayModule,
    NgIf,
    CategoriesMenuComponent,
    TreeModule,
    AsyncPipe,
    AutoFocusModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  inputControl = this.fb.control(
    {
      value: '',
      disabled: false,
    },
    { validators: Validators.required }
  );

  showCategories: boolean = false;

  isSmallDevice: boolean;

  categoriesTree$: Observable<TreeNode[]> = this.categoriesService
    .getAll()
    .pipe(
      map((categories) =>
        this.categoriesService.convertCategoriesToTree(categories)
      )
    );

  categories$: Observable<Category[]> = this.categoriesService.getAll();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.isSmallDevice = window.innerWidth < 768;
  }

  searchByName() {
    this.router.navigate(['search'], {
      queryParams: {
        s: this.inputControl.value,
      },
    });
  }

  searchByCategory(event: any) {
    const categoryId = event.node.key;

    if (categoryId) {
      this.router.navigate(['search'], {
        queryParams: {
          c: categoryId,
        },
      });
    }

    this.showCategories = false;
  }

  toggleCategoriesMenu() {
    this.showCategories = !this.showCategories;
  }
}
