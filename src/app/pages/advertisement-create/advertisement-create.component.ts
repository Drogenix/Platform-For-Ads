import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {CascadeSelectModule} from "primeng/cascadeselect";
import {Category} from "../../core/entities/category";
import {NgxMaskDirective} from "ngx-mask";
import {FileInputComponent} from "../../components/file-input/file-input.component";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {JsonPipe, NgIf} from "@angular/common";
import {AdvertisementsService} from "../../core/services/advertisements.service";
import {Advertisement} from "../../core/entities/advertisement";
import {catchError, takeUntil, tap, throwError} from "rxjs";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {RouterLink} from "@angular/router";
import {DestroyService} from "../../core/services/destroy.service";

type AdvertisementsCategory = Category & {subCategories?: Category[]}

@Component({
  selector: 'app-advertisement-create',
  templateUrl: './advertisement-create.component.html',
  styleUrls: ['./advertisement-create.component.css'],
  providers:[DestroyService],
  imports: [CascadeSelectModule, NgxMaskDirective, FileInputComponent, ReactiveFormsModule, NgIf, JsonPipe, ProgressSpinnerModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class AdvertisementCreateComponent {
  isLoading:boolean = false;

  newAdvertisementId:string;

  error:string;

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
    category:['ff1737cc-67a1-4c2c-b9f4-9603465c1633', Validators.required],
    name:['Mazda rx-7', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    description:['350 л.с., литые диски, без жуков. Полная комплектация, имеется закись азота', [Validators.required, Validators.minLength(30), Validators.maxLength(300)]],
    address:['г. Минск, ул. Ленина д.25',[Validators.required, Validators.minLength(10), Validators.maxLength(60)]],
    imageUrl:['http://90.156.209.122:5000/File/37edece3-0a01-48cd-93f2-06ce989fc3f5',Validators.required],
    price:['5000000', [Validators.required, Validators.maxLength(7)]]
  })
  constructor(private fb:FormBuilder, private advertisementsService:AdvertisementsService, private destroy$:DestroyService, private cdr:ChangeDetectorRef) {}

  markCategoryAsTouched(){
    this.advertisementForm.controls.category.markAsTouched();
    this.advertisementForm.controls.category.updateValueAndValidity();
  }

  createAdvertisement(){
    if(this.advertisementForm.valid){
      const advertisement = (this.advertisementForm.value as unknown) as Advertisement;

      const categoryId = this.advertisementForm.controls.category.value;

      if(categoryId){
        advertisement.categoryId = categoryId;
      }

      this.isLoading = true;
      this.error = '';

      this.advertisementsService.create(advertisement).pipe(
        catchError((err)=> {
          this.error = 'Не удалось создать объявление, попробуйте снова'
          this.isLoading = false;

          this.cdr.markForCheck();

          return throwError(() => err);
        }),
        tap(advertisement=> {
          this.newAdvertisementId = advertisement.id;

          this.isLoading = false;

          this.cdr.markForCheck();
        }),
        takeUntil(this.destroy$)
      ).subscribe()
    }
  }


}
