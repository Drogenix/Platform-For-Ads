import { Component } from '@angular/core';
import {CascadeSelectModule} from "primeng/cascadeselect";
import {Category} from "../../core/entities/category";
import {NgxMaskDirective} from "ngx-mask";

type AdvertiseCategory = Category & {subCategories?: Category[]}

@Component({
  selector: 'app-advertisement-create',
  templateUrl: './advertisement-create.component.html',
  styleUrls: ['./advertisement-create.component.css'],
  standalone: true,
  imports: [CascadeSelectModule, NgxMaskDirective],
})
export class AdvertisementCreateComponent {

  categories: AdvertiseCategory[] = [
    {
      id:'afa',
      name:'Животные',
      parentId:'none',
      subCategories:[
        {
          id:'aaslfalsf',
          name:'Коты',
          parentId:'afa'
        },
        {
          id:'sfasfasf',
          name:'Собаки',
          parentId:'afa'
        },
      ]
    },
    {
      id:'aba',
      name:'Автомобили',
      parentId:'none',
      subCategories:[
        {
          id:'aaslfalsf',
          name:'Легковые',
          parentId:'aba'
        },
        {
          id:'sfasfasf',
          name:'Грузовые',
          parentId:'aba'
        },
      ]
    }
    ]

  log(event:any){
    console.log(event)
  }
}
