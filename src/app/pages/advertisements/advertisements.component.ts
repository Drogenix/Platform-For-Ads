import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AdvertisementsService } from '../../core/services/advertisements.service';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { AdvertisementCardComponent } from '../../components/advertisement-card/advertisement-card.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-advertisements',
  templateUrl: './advertisements.component.html',
  styleUrls: ['./advertisements.component.css'],
  imports: [
    NgIf,
    NgForOf,
    AsyncPipe,
    AdvertisementCardComponent,
    ProgressSpinnerModule,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertisementsComponent {
  advertisements$ = this.advertisementsService.getAll();
  constructor(private advertisementsService: AdvertisementsService) {}
}
