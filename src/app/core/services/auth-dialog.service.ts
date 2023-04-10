import {Injectable} from '@angular/core';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {AuthComponent} from "../../components/auth/auth.component";

@Injectable({
  providedIn: 'root'
})
export class AuthDialogService {
  private _ref:DynamicDialogRef;
  constructor(private dialogService:DialogService) { }
  showAuth(){
    this._ref = this.dialogService.open(AuthComponent, {
      header:'Авторизация',
      width:'416px'
    })
  }
}
