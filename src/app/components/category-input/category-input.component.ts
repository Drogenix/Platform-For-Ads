import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { Category } from '../../core/entities/category';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-category-input',
  standalone: true,
  imports: [
    CommonModule,
    CascadeSelectModule,
    ReactiveFormsModule,
    FormsModule,
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
export class CategoryInputComponent implements ControlValueAccessor {
  @Input() categories: Category[];
  value: Category;
  private _onChange: Function;
  private _onTouched: Function;
  private _touched = false;
  constructor() {}
  markAsTouched() {
    if (!this._touched) {
      this._touched = true;
      this._onTouched();
    }
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }
  writeValue(obj: any): void {
    this.value = obj;
  }
  onChange() {
    const categoryId = this.value.id;
    this._onChange(categoryId);
  }
}
