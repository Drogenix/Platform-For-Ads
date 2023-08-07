import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
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
import { UserService } from '../../core/services/user.service';
import { PhoneInputComponent } from '../../components/phone-input/phone-input.component';
import { Subject, takeUntil } from 'rxjs';
import { InputErrorsComponent } from '../../components/input-errors/input-errors.component';
import { User } from '../../core/entities/user';
import { NotificationsService } from '../../core/services/notifications.service';

const passwordsNotMatch: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {
  const currentPass = group.get('currentPass')?.value;

  const newPass = group.get('newPass')?.value;

  return currentPass !== newPass ? null : { passwordsNotMatch: true };
};

const passwordsLengthNotEquals: ValidatorFn = (
  group: AbstractControl
): ValidationErrors | null => {
  const currentPass = group.get('currentPass')?.value;

  const newPass = group.get('newPass')?.value;

  return currentPass.length === newPass.length
    ? null
    : { passwordsLengthNotEquals: true };
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
    PhoneInputComponent,
    AsyncPipe,
    InputErrorsComponent,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSettingsComponent {
  private _userChangedSubject = new Subject<boolean>();
  userChanged$ = this._userChangedSubject.asObservable();
  private _passChangedSubject = new Subject<boolean>();
  passChanged = this._passChangedSubject.asObservable();
  user = this.userService.user;
  userDataForm = this.fb.nonNullable.group({
    address: [
      this.user?.address,
      [Validators.required, Validators.minLength(10), Validators.maxLength(60)],
    ],
  });
  userPassForm = this.fb.nonNullable.group(
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
    { validators: [passwordsNotMatch, passwordsLengthNotEquals] }
  );
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private destroy$: DestroyService,
    private notificationsService: NotificationsService
  ) {}

  changeUserAddress() {
    if (this.userDataForm.valid) {
      this._userChangedSubject.next(false);

      const user: User = Object.assign(this.userDataForm.value);
      this.userService
        .updateUser(user)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => this._userChangedSubject.next(true),
        });
    }
  }

  changePass() {
    if (this.userPassForm.valid) {
      this._passChangedSubject.next(false);

      const newPassword = this.userPassForm.controls.newPass.value;
      const currentPassword = this.userPassForm.controls.currentPass.value;

      this.userService
        .updateUserPass(currentPassword, newPassword)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => this._passChangedSubject.next(true),
          error: (err) => this.notificationsService.showInfo(err),
        });
    }
  }
}
