import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { Category } from '../../core/entities/category';
import { NgxMaskDirective } from 'ngx-mask';
import { FileInputComponent } from '../../components/file-input/file-input.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe, NgIf } from '@angular/common';
import { AdvertisementsService } from '../../core/services/advertisements.service';
import { Advertisement } from '../../core/entities/advertisement';
import { takeUntil } from 'rxjs';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RouterLink } from '@angular/router';
import { DestroyService } from '../../core/services/destroy.service';
import { AddressInputComponent } from '../../components/address-input/address-input.component';

type AdvertisementCategory = Category & { subCategories?: Category[] };

@Component({
  selector: 'app-advertisement-create',
  templateUrl: './advertisement-create.component.html',
  styleUrls: ['./advertisement-create.component.css'],
  providers: [DestroyService],
  imports: [
    CascadeSelectModule,
    NgxMaskDirective,
    FileInputComponent,
    ReactiveFormsModule,
    NgIf,
    JsonPipe,
    ProgressSpinnerModule,
    RouterLink,
    AddressInputComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AdvertisementCreateComponent {
  isLoading: boolean = false;
  newAdvertisementId: string;
  error: string;
  categories: AdvertisementCategory[] = [
    {
      id: 'afa',
      name: 'Животные',
      parentId: 'none',
      subCategories: [
        {
          id: 'aaslfalsf',
          name: 'Коты',
          parentId: 'afa',
        },
        {
          id: 'sfasfasf',
          name: 'Собаки',
          parentId: 'afa',
        },
      ],
    },
    {
      id: 'aba',
      name: 'Автомобили',
      parentId: 'none',
      subCategories: [
        {
          id: 'aaslfalsf',
          name: 'Легковые',
          parentId: 'aba',
        },
        {
          id: 'sfasfasf',
          name: 'Грузовые',
          parentId: 'aba',
        },
      ],
    },
  ];
  advertisementForm = this.fb.group({
    category: ['', Validators.required],
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    description: [
      '',
      [
        Validators.required,
        Validators.minLength(30),
        Validators.maxLength(300),
      ],
    ],
    address: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(60)],
    ],
    imageUrl: ['', Validators.required],
    price: ['', [Validators.required, Validators.maxLength(7)]],
  });

  constructor(
    private fb: FormBuilder,
    private advertisementsService: AdvertisementsService,
    private destroy$: DestroyService,
    private cdr: ChangeDetectorRef
  ) {}

  private getFormValue(): Advertisement {
    const advertisement: Advertisement = Object.assign(
      this.advertisementForm.value
    );

    const category: Category = Object.assign(
      this.advertisementForm.value
    ).category;

    advertisement.categoryId = category.id;

    return advertisement;
  }

  markCategoryAsTouched() {
    this.advertisementForm.controls.category.markAsTouched();
    this.advertisementForm.controls.category.updateValueAndValidity();
  }

  createAdvertisement() {
    if (this.advertisementForm.valid) {
      debugger;
      const advertisement = this.getFormValue();

      this.isLoading = true;
      this.error = '';

      this.advertisementsService
        .create(advertisement)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.newAdvertisementId = advertisement.id;

            this.isLoading = false;

            this.cdr.markForCheck();
          },
          error: () => {
            this.error =
              'Не удалось создать объявление, проверьте правильность данных и попробуйте снова';

            this.isLoading = false;

            this.cdr.markForCheck();
          },
        });
    }
  }
}
