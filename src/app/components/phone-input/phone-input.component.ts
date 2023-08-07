import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-phone-input',
  standalone: true,
  imports: [CommonModule, NgxMaskDirective, ReactiveFormsModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PhoneInputComponent,
      multi: true,
    },
  ],
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.css'],
})
export class PhoneInputComponent implements ControlValueAccessor {
  private _onChange: Function;
  private _onTouched: Function;
  private _touched: boolean = false;
  value: string;
  constructor() {}
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }
  writeValue(value: string): void {
    this.value = value.slice(1, value.length);
  }
  markAsTouched() {
    if (!this._touched) {
      this._touched = true;
      this._onTouched();
    }
  }
  onChange() {
    const phone = '7' + this.value;
    this._onChange(phone);
  }
}
