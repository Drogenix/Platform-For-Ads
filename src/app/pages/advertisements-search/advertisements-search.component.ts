import { Component } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { AdvertisementCardComponent } from '../../components/advertisement-card/advertisement-card.component';
import { AdvertisementsService } from '../../core/services/advertisements.service';
import { DropdownModule } from 'primeng/dropdown';
import { TreeModule } from 'primeng/tree';
import { TreeNode } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-advertisements-search',
  standalone: true,
  imports: [
    AdvertisementCardComponent,
    DropdownModule,
    ProgressSpinnerModule,
    TreeModule,
    AsyncPipe,
    NgForOf,
    NgIf,
  ],
  templateUrl: './advertisements-search.component.html',
  styleUrls: ['./advertisements-search.component.css'],
})
export class AdvertisementsSearchComponent {
  readonly sortOptions = [
    {
      label: 'Новизне',
    },
    {
      label: 'Стоимости',
    },
  ];
  categories: TreeNode[] = [
    {
      key: '0',
      label: 'Животные',
      children: [
        {
          key: '0-0',
          label: 'Коты',
        },
        {
          key: '0-1',
          label: 'Собаки',
        },
      ],
    },
    {
      key: '0',
      label: 'Животные',
      children: [
        {
          key: '0-0',
          label: 'Коты',
        },
        {
          key: '0-1',
          label: 'Собаки',
        },
      ],
    },
    {
      key: '0',
      label: 'Животные',
      children: [
        {
          key: '0-0',
          label: 'Коты',
        },
        {
          key: '0-1',
          label: 'Собаки',
        },
      ],
    },
    {
      key: '0',
      label: 'Животные',
      children: [
        {
          key: '0-0',
          label: 'Коты',
        },
        {
          key: '0-1',
          label: 'Собаки',
        },
      ],
    },
    {
      key: '0',
      label: 'Животные',
    },
  ];
  isMenuVisible: boolean = false;
  advertisements$ = this.advertisementsService.getAll();

  constructor(private advertisementsService: AdvertisementsService) {}

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }
}
