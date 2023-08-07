import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { UserService } from '../../core/services/user.service';
import { Router } from '@angular/router';
import { DestroyService } from '../../core/services/destroy.service';
import { takeUntil } from 'rxjs';
import { AuthDialogService } from '../../core/services/auth-dialog.service';
import { NgIf } from '@angular/common';
import { PhoneInputComponent } from '../phone-input/phone-input.component';
import { NotificationsService } from '../../core/services/notifications.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [DestroyService],
  imports: [
    ReactiveFormsModule,
    NgxMaskDirective,
    ProgressSpinnerModule,
    NgIf,
    PhoneInputComponent,
  ],
  standalone: true,
})
export class RegisterComponent {
  isSubmitting: boolean = false;
  error: string;
  registerForm = this.fb.group({
    phone: [
      '',
      [Validators.required, Validators.minLength(11), Validators.maxLength(11)],
    ],
    password: [
      '',
      [Validators.required, Validators.minLength(8), Validators.maxLength(24)],
    ],
  });

  constructor(
    private fb: FormBuilder,
    private authDialog: AuthDialogService,
    private userService: UserService,
    private router: Router,
    private destroy$: DestroyService,
    private notificationsService: NotificationsService
  ) {}

  register() {
    if (this.registerForm.valid) {
      this.isSubmitting = true;
      this.error = '';

      const user = this.registerForm.value;

      this.userService
        .register(user)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.authDialog.close();
            this.notificationsService.showInfo(
              'Аккаунт успешно зарегистрирован'
            );
            this.router.navigate(['']);
          },
          error: (err) => {
            this.isSubmitting = false;
            this.error = err;
          },
        });
    }
  }
  goToLogin() {
    this.authDialog.showLogin();
  }
}
