import { Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoginComponent } from '../../components/login/login.component';
import { RegisterComponent } from '../../components/register/register.component';

@Injectable({
  providedIn: 'root',
})
export class AuthDialogService {
  private _ref: DynamicDialogRef;

  constructor(private dialogService: DialogService) {}

  close() {
    if (this._ref) {
      this._ref.close();
    }
  }

  showLogin() {
    this.close();
    this._ref = this.dialogService.open(LoginComponent, {
      header: 'Авторизация',
      width: '416px',
    });
  }

  showRegister() {
    this.close();
    this._ref = this.dialogService.open(RegisterComponent, {
      header: 'Регистрация',
      width: '416px',
    });
  }
}
