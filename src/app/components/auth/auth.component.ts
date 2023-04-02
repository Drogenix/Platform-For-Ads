import {Component, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogComponent} from "../dialog/dialog.component";
import {NgxMaskDirective} from "ngx-mask";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, DialogComponent, NgxMaskDirective],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  @ViewChild(DialogComponent) private _dialogRef:DialogComponent

  show(){
    this._dialogRef.open();
  }
}
