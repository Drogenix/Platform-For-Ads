import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PanelMenuModule} from "primeng/panelmenu";
import {AdvertisementCardComponent} from "../../components/advertisement-card/advertisement-card.component";
import {AdvertisementsService} from "../../core/services/advertisements.service";
import {DropdownModule} from "primeng/dropdown";
import {TreeModule} from "primeng/tree";
import {TreeNode} from "primeng/api";

@Component({
  selector: 'app-advertisements-search',
  standalone: true,
  imports: [CommonModule, PanelMenuModule, AdvertisementCardComponent, DropdownModule, TreeModule],
  templateUrl: './advertisements-search.component.html',
  styleUrls: ['./advertisements-search.component.css']
})
export class AdvertisementsSearchComponent {
  isMenuVisible:boolean = false;
  sortBy = [
    {
      label:'Новизне',
    },
    {
      label:'Стоимости',
    }
    ]
  categories: TreeNode[] = [
    {
      key: '0',
      label: 'Животные',
      children: [
        {
          key: '0-0',
          label: 'Коты'
        },
        {
          key: '0-1',
          label: 'Собаки'
        }
      ]
    },
    {
      key: '0',
      label: 'Животные',
      children: [
        {
          key: '0-0',
          label: 'Коты'
        },
        {
          key: '0-1',
          label: 'Собаки'
        }
      ]
    },
    {
      key: '0',
      label: 'Животные',
      children: [
        {
          key: '0-0',
          label: 'Коты'
        },
        {
          key: '0-1',
          label: 'Собаки'
        }
      ]
    },
    {
      key: '0',
      label: 'Животные',
      children: [
        {
          key: '0-0',
          label: 'Коты'
        },
        {
          key: '0-1',
          label: 'Собаки'
        }
      ]
    },
    {
      key: '0',
      label: 'Животные'
    },
  ];
  ads$ = this.adsService.getAll();
  constructor(private adsService:AdvertisementsService) {
  }

  toggleMenu(){
    this.isMenuVisible = ! this.isMenuVisible;
  }
}
