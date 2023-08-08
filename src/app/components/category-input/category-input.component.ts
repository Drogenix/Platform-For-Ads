import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { Category } from '../../core/entities/category';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { TreeSelectModule } from 'primeng/treeselect';
import { CategoriesService } from '../../core/services/categories.service';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-category-input',
  standalone: true,
  imports: [
    CommonModule,
    CascadeSelectModule,
    ReactiveFormsModule,
    FormsModule,
    TreeSelectModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CategoryInputComponent,
      multi: true,
    },
  ],
  templateUrl: './category-input.component.html',
  styleUrls: ['./category-input.component.css'],
})
export class CategoryInputComponent implements ControlValueAccessor, OnInit {
  @Input() categories: Category[];

  categoriesTree: TreeNode[];
  private _onChange: Function;
  private _onTouched: Function;
  private _touched = false;
  constructor(private categoriesService: CategoriesService) {}
  markAsTouched() {
    if (!this._touched) {
      this._touched = true;
      this._onTouched();
    }
  }

  ngOnInit() {
    this.categoriesTree = this.categoriesService.convertCategoriesToTree(
      this.categories
    );
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }
  writeValue(obj: any): void {}
  onChange(event: any) {
    const categoryId = event.node.key;
    this._onChange(categoryId);
  }
}
