import {Component, ViewChild} from '@angular/core';
import {DialogComponent} from "../../components/dialog/dialog.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-advertisement-page',
  templateUrl: './advertisement-page.component.html',
  styleUrls: ['./advertisement-page.component.css'],
  imports:[DialogComponent, NgIf],
  standalone:true
})
export class AdvertisementPageComponent {

  @ViewChild(DialogComponent) private _dialogRef: DialogComponent;
  showNumber(){
    this._dialogRef.open();
  }

}
