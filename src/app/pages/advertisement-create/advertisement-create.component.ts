import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { NgxMaskDirective } from 'ngx-mask';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import { AdvertisementsService } from '../../core/services/advertisements.service';
import { Advertisement } from '../../core/entities/advertisement';
import { takeUntil } from 'rxjs';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RouterLink } from '@angular/router';
import { DestroyService } from '../../core/services/destroy.service';
import { AddressInputComponent } from '../../components/address-input/address-input.component';
import { CategoriesService } from '../../core/services/categories.service';
import { InputErrorsComponent } from '../../components/input-errors/input-errors.component';
import { CategoryInputComponent } from '../../components/category-input/category-input.component';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageUploadComponent } from '../../components/image-upload/image-upload.component';
import { UserService } from '../../core/services/user.service';
import { NotificationsService } from '../../core/services/notifications.service';

@Component({
  selector: 'app-advertisement-create',
  templateUrl: './advertisement-create.component.html',
  styleUrls: ['./advertisement-create.component.css'],
  providers: [DestroyService],
  imports: [
    CascadeSelectModule,
    NgxMaskDirective,
    ReactiveFormsModule,
    NgIf,
    JsonPipe,
    ProgressSpinnerModule,
    RouterLink,
    AddressInputComponent,
    AsyncPipe,
    InputErrorsComponent,
    CategoryInputComponent,
    FileUploadModule,
    NgForOf,
    ImageUploadComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class AdvertisementCreateComponent {
  readonly descriptionMaxLength = 1500;
  isLoading: boolean = false;
  error: string;
  categories$ = this.categoriesService.getAll();
  advertisementForm = this.fb.group({
    categoryId: ['', Validators.required],
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    description: ['', [Validators.required, Validators.minLength(100)]],
    address: [
      this.userService.user?.address,
      [Validators.required, Validators.minLength(10), Validators.maxLength(60)],
    ],
    images: ['', Validators.required],
    price: ['', [Validators.required, Validators.maxLength(7)]],
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private advertisementsService: AdvertisementsService,
    private categoriesService: CategoriesService,
    private destroy$: DestroyService,
    private cdr: ChangeDetectorRef,
    private notificationsService: NotificationsService
  ) {}

  createAdvertisement() {
    if (this.advertisementForm.valid) {
      const advertisement: Advertisement = Object.assign(
        this.advertisementForm.value
      );

      advertisement.createdAt = new Date();

      this.isLoading = true;
      this.error = '';

      this.advertisementsService
        .create(advertisement)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.notificationsService.showInfo('Новое объявление создано');

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
