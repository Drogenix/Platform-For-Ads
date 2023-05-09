import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SlideMenuModule } from 'primeng/slidemenu';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OverlayModule } from 'primeng/overlay';
import { NgIf } from '@angular/common';
import { CategoriesMenuComponent } from '../categories-menu/categories-menu.component';

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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  inputControl = this.fb.control(
    {
      value: '',
      disabled: false,
    },
    { validators: Validators.required }
  );

  categoriesMenuVisible: boolean = false;

  constructor(private router: Router, private fb: FormBuilder) {}

  goToSearch() {
    this.router.navigate(['search'], {
      queryParams: {
        s: this.inputControl.value,
      },
    });
  }
}
