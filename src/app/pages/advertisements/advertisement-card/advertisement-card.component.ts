import {Component, Input} from '@angular/core';
import {Advertisement} from "../../../core/entities/advertisement";

@Component({
  selector: 'advertisement-card',
  templateUrl: './advertisement-card.component.html',
  styleUrls: ['./advertisement-card.component.css'],
  standalone:true
})
export class AdvertisementCardComponent {

  @Input() advertisement: Advertisement;

  constructor() {
  }
}
