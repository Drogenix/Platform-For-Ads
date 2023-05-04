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

const REGISTER_ERROR = 'Пользователь с таким номером телефона уже существует';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [DestroyService],
  imports: [ReactiveFormsModule, NgxMaskDirective, ProgressSpinnerModule, NgIf],
  standalone: true,
})
export class RegisterComponent {
  isSubmitting: boolean = false;
  error: string;
  registerForm = this.fb.group({
    login: [
      '',
      [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
    ],
    email: ['', [Validators.required, Validators.email]],
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

  register() {
    if (this.registerForm.valid) {
      this.isSubmitting = true;
      this.error = '';

      const user = this.registerForm.value;
      user.login = '+7' + user.login;

      this.userService
        .register(user)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.authDialog.close();
            this.router.navigate(['']);
          },
          error: () => {
            this.isSubmitting = false;
            this.error = REGISTER_ERROR;
          },
        });
    }
  }
  goToLogin() {
    this.authDialog.showLogin();
  }
}
