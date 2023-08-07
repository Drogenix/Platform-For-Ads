import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';
import { DestroyService } from '../../core/services/destroy.service';
import { takeUntil } from 'rxjs';

type LengthError = {
  actualLength: number;
  requiredLength: number;
};
@Component({
  selector: 'app-input-errors',
  standalone: true,
  imports: [CommonModule],
  providers: [DestroyService],
  templateUrl: './input-errors.component.html',
  styleUrls: ['./input-errors.component.css'],
})
export class InputErrorsComponent implements OnInit {
  @Input() control: FormControl;
  lengthError: LengthError;
  constructor(private destroy$: DestroyService) {}
  ngOnInit(): void {
    this.control.valueChanges.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        const minlengthError = this.control.errors?.['minlength'];
        const maxlengthError = this.control.errors?.['maxlength'];

        if (minlengthError) this.lengthError = minlengthError;

        if (maxlengthError) this.lengthError = maxlengthError;
      },
    });
  }
}
