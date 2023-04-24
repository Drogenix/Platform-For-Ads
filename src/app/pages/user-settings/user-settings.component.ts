import {ChangeDetectionStrategy, Component} from '@angular/core';
import {JsonPipe, NgIf} from "@angular/common";
import {NgxMaskDirective} from "ngx-mask";
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";

const passwordsNotEquals: ValidatorFn = (group:AbstractControl):ValidationErrors | null =>{
  const currentPass = group.get('currentPass')?.value;

  const newPass = group.get('newPass')?.value;

  return (currentPass!==newPass) ? null : {passwordsEquals:true}
}

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf, NgxMaskDirective, ReactiveFormsModule, JsonPipe
  ],
})
export class UserSettingsComponent{
  isUserDataChanged = false;

  isUserPassChanged = false;

  userDataForm = this.fb.group({
    name:['', [Validators.required, Validators.minLength(3), Validators.maxLength(24), Validators.pattern('^[a-zA-Z]+$')]],
    phone:['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    address:['', [Validators.required, Validators.minLength(10), Validators.maxLength(60)]]
  });
  userPassForm = this.fb.group({
    currentPass:['',[Validators.required, Validators.minLength(8), Validators.maxLength(24)]],
    newPass:['', [Validators.required, Validators.minLength(8), Validators.maxLength(24)]]
  }, {validators: passwordsNotEquals});

  constructor(private fb:FormBuilder) {}
  submitUserData(){
    this.isUserDataChanged = true;
  }

  submitUserPass(){
    this.isUserDataChanged = true;
  }

}
