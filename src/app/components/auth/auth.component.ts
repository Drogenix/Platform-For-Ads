import {ChangeDetectionStrategy, Component} from '@angular/core';
import {NgxMaskDirective} from "ngx-mask";
import {NgClass, NgIf} from "@angular/common";
import {DynamicDialogComponent} from "primeng/dynamicdialog";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../core/services/user.service";
import {tap} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgxMaskDirective, NgIf, ReactiveFormsModule, NgClass],
})
export class AuthComponent {
  isSignIn: boolean = true;

  authForm = this.fb.group({
    login:['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(24)]],
    name: ['', [Validators.minLength(8), Validators.maxLength(24)]]
  }, )

  constructor(private _ddr:DynamicDialogComponent, private fb:FormBuilder, private userService:UserService, private router:Router) {
  }
  private setDialogTitle(){
    this._ddr.config.header = this.isSignIn ? 'Авторизация' : 'Регистрация'
  }

  changeAuthType(){
    this.isSignIn = !this.isSignIn;

    this.setDialogTitle();
  }
  submitAuth(){
    if(this.authForm.valid){
      this.userService.auth(this.authForm.value).pipe(tap(()=> {
        this._ddr.close();

        this.router.navigateByUrl('');
      })).subscribe();
    }
  }
}
