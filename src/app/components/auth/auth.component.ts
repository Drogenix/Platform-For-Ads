import {Component} from '@angular/core';
import {NgxMaskDirective} from "ngx-mask";
import {NgIf} from "@angular/common";
import {DynamicDialogComponent} from "primeng/dynamicdialog";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  standalone: true,
  imports: [NgxMaskDirective, NgIf],
})
export class AuthComponent {
  isSignIn: boolean = true;

  constructor(private _ddr:DynamicDialogComponent) {
  }
  private setDialogTitle(){
    this._ddr.config.header = this.isSignIn ? 'Авторизация' : 'Регистрация'
  }

  changeAuthType(){
    this.isSignIn = !this.isSignIn;

    this.setDialogTitle();
  }

}
