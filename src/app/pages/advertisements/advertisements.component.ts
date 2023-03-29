import {Component} from '@angular/core';
import {AdvertisementsService} from "../../core/services/advertisements.service";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {AdvertisementCardComponent} from "../../components/advertisement-card/advertisement-card.component";

@Component({
  selector: 'app-advertisements',
  templateUrl: './advertisements.component.html',
  styleUrls: ['./advertisements.component.css'],
  providers: [AdvertisementsService],
    imports: [
        NgIf,
        NgForOf,
        AsyncPipe,
        AdvertisementCardComponent
    ],
  standalone: true
})
export class AdvertisementsComponent{

  response$ = this.advertisementsService.getAll(16);
  constructor(private advertisementsService: AdvertisementsService) {}
}
