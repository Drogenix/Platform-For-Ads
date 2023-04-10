import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Advertisement} from "../../core/entities/advertisement";
import {RouterLink} from "@angular/router";
import {DatePipe, NgOptimizedImage, TitleCasePipe} from "@angular/common";

@Component({
    selector: 'advertisement-card',
    templateUrl: './advertisement-card.component.html',
    styleUrls: ['./advertisement-card.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterLink, NgOptimizedImage, DatePipe, TitleCasePipe],
    standalone: true
})
export class AdvertisementCardComponent {

  @Input() advertisement: Advertisement;

  constructor() {
  }
}
