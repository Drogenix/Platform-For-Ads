import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {DialogService, DynamicDialogModule, DynamicDialogRef} from "primeng/dynamicdialog";
import {NumberModalComponent} from "../../components/number-modal/number-modal.component";
import {AdvertisementsService} from "../../core/services/advertisements.service";
import {Observable, switchMap, tap} from "rxjs";
import {Advertisement} from "../../core/entities/advertisement";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-advertisement-view',
  templateUrl: './advertisement-view.component.html',
  styleUrls: ['./advertisement-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers:[DialogService],
  imports: [DynamicDialogModule, NgIf, AsyncPipe],
  standalone:true
})
export class AdvertisementViewComponent implements OnInit{

  data$:Observable<Advertisement>;
  ref: DynamicDialogRef;
  constructor(private dialogService: DialogService,
              private advertisementsService:AdvertisementsService,
              private activatedRoute:ActivatedRoute) {
  }
  showNumber(){
    this.ref = this.dialogService.open(NumberModalComponent, {
      header: "Пользователь",
      width:'516px'
    })
  }

  ngOnInit(): void {
    this.data$ = this.activatedRoute.params.pipe(
      tap(params => console.log(params['id'])),
      switchMap(params => this.advertisementsService.getById(params['id'])),
    )
  }
}
