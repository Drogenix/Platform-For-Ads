import {Component, Input} from '@angular/core';
import {Advertisement} from "../../../core/entities/advertisement";
import {RouterLink} from "@angular/router";

@Component({
    selector: 'advertisement-card',
    templateUrl: './advertisement-card.component.html',
    styleUrls: ['./advertisement-card.component.css'],
    imports: [
        RouterLink
    ],
    standalone: true
})
export class AdvertisementCardComponent {

  @Input() advertisement: Advertisement;

  constructor() {
  }
}
