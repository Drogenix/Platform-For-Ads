import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import {
  debounceTime,
  distinctUntilChanged,
  fromEvent,
  map,
  Observable,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { Address } from '../../core/entities/address';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AddressesService } from '../../core/services/addresses.service';
import { DestroyService } from '../../core/services/destroy.service';
import { OverlayModule } from 'primeng/overlay';

@Component({
  selector: 'app-address-input',
  templateUrl: './address-input.component.html',
  styleUrls: ['./address-input.component.css'],
  providers: [
    DestroyService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AddressInputComponent,
      multi: true,
    },
  ],
  imports: [NgIf, NgForOf, AsyncPipe, OverlayModule],
  standalone: true,
})
export class AddressInputComponent implements OnInit, ControlValueAccessor {
  onChange: Function;
  onTouched: Function;
  selectVisible: boolean = false;
  addresses$: Observable<Address[]>;
  @ViewChild('input', { static: true })
  private _input: ElementRef<HTMLInputElement>;
  private _touched: boolean = false;

  constructor(
    private addressesService: AddressesService,
    private destroy$: DestroyService
  ) {}

  ngOnInit(): void {
    this.addresses$ = fromEvent(this._input.nativeElement, 'input').pipe(
      tap(() => this.onChange(this._input.nativeElement.value)),
      map(() => this._input.nativeElement.value),
      debounceTime(100),
      distinctUntilChanged(),
      switchMap((value) => this.addressesService.getAddresses(value)),
      map((response) => response.suggestions),
      tap(() => (this.selectVisible = true)),
      takeUntil(this.destroy$)
    );
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: string): void {
    this._input.nativeElement.value = value;
  }

  markAsTouched() {
    if (!this._touched) {
      this._touched = true;
      this.onTouched();
    }
  }

  onBlur() {
    this.markAsTouched();
    this.selectVisible = false;
  }

  selectAddress(value: string) {
    this._input.nativeElement.value = value;
    this.onChange(value);
    this.selectVisible = false;
  }
}
