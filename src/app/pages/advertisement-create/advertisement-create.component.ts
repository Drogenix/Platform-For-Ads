import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CascadeSelectModule} from "primeng/cascadeselect";
import {Category} from "../../core/entities/category";
import {NgxMaskDirective} from "ngx-mask";
import {FileInputComponent} from "../../components/file-input/file-input.component";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {JsonPipe, NgIf} from "@angular/common";

type AdvertisementsCategory = Category & {subCategories?: Category[]}

@Component({
  selector: 'app-advertisement-create',
  templateUrl: './advertisement-create.component.html',
  styleUrls: ['./advertisement-create.component.css'],
  standalone: true,
  imports: [CascadeSelectModule, NgxMaskDirective, FileInputComponent, ReactiveFormsModule, NgIf, JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertisementCreateComponent {
  categories: AdvertisementsCategory[] = [
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
  advertisementForm = this.fb.group({
    category:['', Validators.required],
    name:['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    description:['', [Validators.required, Validators.minLength(30), Validators.maxLength(300)]],
    address:['',[Validators.required, Validators.minLength(10), Validators.maxLength(60)]],
    image:['',Validators.required],
    price:['', [Validators.required, Validators.maxLength(7)]]
  })
  constructor(private fb:FormBuilder) {}

  createAdvertisement(){
    console.log(this.advertisementForm.value);
  }
}
