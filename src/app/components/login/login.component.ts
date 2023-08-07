import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { NgxMaskDirective } from 'ngx-mask';
import { UserService } from '../../core/services/user.service';
import { takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { DestroyService } from '../../core/services/destroy.service';
import { AuthDialogService } from '../../core/services/auth-dialog.service';
import { NgIf } from '@angular/common';
import { PhoneInputComponent } from '../phone-input/phone-input.component';
import { NotificationsService } from '../../core/services/notifications.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [DestroyService],
  imports: [
    ProgressSpinnerModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgIf,
    PhoneInputComponent,
  ],
  standalone: true,
})
export class LoginComponent {
  isSubmitting: boolean = false;
  error: string;
  loginForm = this.fb.nonNullable.group({
    phone: [
      '71111111111',
      [Validators.required, Validators.minLength(11), Validators.maxLength(11)],
    ],
    password: [
      'password1',
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
  login() {
    if (this.loginForm.valid) {
      this.isSubmitting = true;
      this.error = '';

      const user = this.loginForm.value;

      this.userService
        .login(user)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.authDialog.close();
            this.notificationsService.showInfo('Вы успешно авторизовались');
            this.router.navigate(['']);
          },
          error: (err) => {
            this.isSubmitting = false;
            this.error = err;
          },
        });
    }
  }
  goToRegister() {
    this.authDialog.showRegister();
  }
}
