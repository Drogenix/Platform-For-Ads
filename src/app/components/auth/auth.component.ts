import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NgxMaskDirective} from "ngx-mask";
import {AsyncPipe, NgClass, NgIf} from "@angular/common";
import {DynamicDialogComponent} from "primeng/dynamicdialog";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../core/services/user.service";
import {BehaviorSubject, catchError, takeUntil, tap, throwError} from "rxjs";
import {Router} from "@angular/router";
import {DestroyService} from "../../core/services/destroy.service";
import {ProgressSpinnerModule} from "primeng/progressspinner";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  imports: [NgxMaskDirective, NgIf, ReactiveFormsModule, NgClass, ProgressSpinnerModule, AsyncPipe],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent {
  error: string;
  submitting$ = new BehaviorSubject<boolean>(false);
  isSignIn: boolean = true;

  authForm = this.fb.group({
    login:['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(24)]],
    email: ['', [Validators.email]]
  }, )

  constructor(private ddr:DynamicDialogComponent,
              private fb:FormBuilder,
              private userService:UserService,
              private router:Router,
              private destroy$:DestroyService) {}
  private setDialogTitle(){
    this.ddr.config.header = this.isSignIn ? 'Авторизация' : 'Регистрация'
  }

  private updateEmailControl(){
    if(!this.isSignIn){
      this.authForm.controls.email.addValidators(Validators.required)
    }
    else{
      this.authForm.controls.email.removeValidators(Validators.required)
    }

    this.authForm.controls.email.updateValueAndValidity()
  }

  changeAuthType(){
    this.isSignIn = !this.isSignIn;

    this.updateEmailControl()

    this.setDialogTitle();
  }
  submit(){
    if(this.authForm.valid){
      this.submitting$.next(true)

      this.error = '';

      const user = this.authForm.value;

      user.login = '+7'+user.login;

      const authType = this.isSignIn ? 'login' : 'register'

      this.userService.auth(authType, user).pipe(
          catchError((err) => {
            this.submitting$.next(false)
            this.error = "Не удалось авторизоваться! Попробуйте снова"

            return throwError(()=> err)
          }),
          tap(()=> {
            this.ddr.close();
            this.router.navigate(['']);
          }),
          takeUntil(this.destroy$)
        ).subscribe();

    }
  }
}
