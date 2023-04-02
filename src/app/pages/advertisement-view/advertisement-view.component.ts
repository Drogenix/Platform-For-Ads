import {Component} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {DialogService, DynamicDialogModule, DynamicDialogRef} from "primeng/dynamicdialog";
import {NumberModalComponent} from "../../components/number-modal/number-modal.component";
import {AdvertisementsService} from "../../core/services/advertisements.service";

@Component({
  selector: 'app-advertisement-view',
  templateUrl: './advertisement-view.component.html',
  styleUrls: ['./advertisement-view.component.css'],
  providers:[DialogService],
  imports: [DynamicDialogModule, NgIf, AsyncPipe],
  standalone:true
})
export class AdvertisementViewComponent {

  data$ = this.advertisementsService.getAll(1);
  ref: DynamicDialogRef;
  constructor(private dialogService: DialogService, private advertisementsService:AdvertisementsService) {
  }
  showNumber(){
    this.ref = this.dialogService.open(NumberModalComponent, {
      header: "Пользователь",
      width:'516px'
    })
  }

}
