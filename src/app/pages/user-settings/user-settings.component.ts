import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { DestroyService } from '../../core/services/destroy.service';
import { OverlayModule } from 'primeng/overlay';
import { AddressInputComponent } from '../../components/address-input/address-input.component';

const passwordsNotEquals: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {
  const currentPass = group.get('currentPass')?.value;

  const newPass = group.get('newPass')?.value;

  return currentPass !== newPass ? null : { passwordsEquals: true };
};

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css'],
  providers: [DestroyService],
  imports: [
    NgxMaskDirective,
    ReactiveFormsModule,
    OverlayModule,
    AddressInputComponent,
    NgIf,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSettingsComponent {
  userDataForm = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(24),
        Validators.pattern('^[а-яА-Я]+$'),
      ],
    ],
    phone: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
    ],
    address: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(60)],
    ],
  });
  userPassForm = this.fb.group(
    {
      currentPass: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(24),
        ],
      ],
      newPass: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(24),
        ],
      ],
    },
    { validators: passwordsNotEquals }
  );
  isUserDataChanged = false;
  isUserPassChanged = false;

  constructor(private fb: FormBuilder) {}

  changeUserData() {
    this.isUserDataChanged = true;
  }

  changePass() {
    this.isUserDataChanged = true;
  }
}
