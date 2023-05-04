import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { NgxMaskDirective } from 'ngx-mask';
import { UserService } from '../../core/services/user.service';
import { takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { DestroyService } from '../../core/services/destroy.service';
import { AuthDialogService } from '../../core/services/auth-dialog.service';

const LOGIN_ERROR = 'Не удалось авторизоваться! Попробуйте снова';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [DestroyService],
  imports: [ProgressSpinnerModule, ReactiveFormsModule, NgxMaskDirective],
  standalone: true,
})
export class LoginComponent {
  isSubmitting: boolean = false;
  error: string;
  loginForm = this.fb.group({
    login: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
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
    private destroy$: DestroyService
  ) {}
  login() {
    if (this.loginForm.valid) {
      this.isSubmitting = true;

      this.error = '';

      const user = this.loginForm.value;
      user.login = '+7' + user.login;

      this.userService
        .login(user)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.authDialog.close();
            this.router.navigate(['']);
          },
          error: () => {
            this.isSubmitting = false;
            this.error = LOGIN_ERROR;
          },
        });
    }
  }
  goToRegister() {
    this.authDialog.showRegister();
  }
}
