import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AdvertisementsService} from "../../core/services/advertisements.service";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {AdvertisementCardComponent} from "../../components/advertisement-card/advertisement-card.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-user-advertisements',
  templateUrl: './user-advertisements.component.html',
  styleUrls: ['./user-advertisements.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgIf, NgForOf, AsyncPipe, AdvertisementCardComponent, RouterLink],
  standalone:true
})
export class UserAdvertisementsComponent {
  response$ = this.advertisementsService.getAll();
  constructor(private advertisementsService: AdvertisementsService) {}
}
