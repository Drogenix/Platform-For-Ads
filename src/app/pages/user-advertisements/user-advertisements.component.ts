import { Component } from '@angular/core';
import {AdvertisementsService} from "../../core/services/advertisements.service";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {AdvertisementCardComponent} from "../../components/advertisement-card/advertisement-card.component";

@Component({
  selector: 'app-user-advertisements',
  templateUrl: './user-advertisements.component.html',
  styleUrls: ['./user-advertisements.component.css'],
  imports:[NgIf, NgForOf, AsyncPipe, AdvertisementCardComponent],
  standalone:true
})
export class UserAdvertisementsComponent {
  response$ = this.advertisementsService.getAll(3);
  constructor(private advertisementsService: AdvertisementsService) {}
}
