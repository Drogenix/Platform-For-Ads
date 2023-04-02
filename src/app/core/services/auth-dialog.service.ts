import {inject, Injectable} from '@angular/core';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {AuthComponent} from "../../components/auth/auth.component";

@Injectable({
  providedIn: 'root'
})
export class AuthDialogService {
  private _ref:DynamicDialogRef;
  public _dialogService = inject(DialogService);
  constructor() { }
  showAuth(){
    this._ref = this._dialogService.open(AuthComponent, {
      header:'Авторизация',
      width:'416px'
    })
  }
}
