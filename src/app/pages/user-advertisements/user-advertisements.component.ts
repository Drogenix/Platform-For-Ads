import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AdvertisementsService } from '../../core/services/advertisements.service';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { AdvertisementCardComponent } from '../../components/advertisement-card/advertisement-card.component';
import { RouterLink } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-user-advertisements',
  templateUrl: './user-advertisements.component.html',
  styleUrls: ['./user-advertisements.component.css'],
  imports: [
    NgIf,
    NgForOf,
    AsyncPipe,
    AdvertisementCardComponent,
    RouterLink,
    ProgressSpinnerModule,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAdvertisementsComponent {
  advertisements$ = this.advertisementsService.getUserAdvertisements();
  constructor(private advertisementsService: AdvertisementsService) {}
}
