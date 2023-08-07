import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { AdvertisementNumberComponent } from '../../components/advertisement-number/advertisement-number.component';
import { AdvertisementsService } from '../../core/services/advertisements.service';
import { combineLatest, map, Observable, switchMap, tap } from 'rxjs';
import { Advertisement } from '../../core/entities/advertisement';
import { ActivatedRoute } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Category } from '../../core/entities/category';
import { CategoriesService } from '../../core/services/categories.service';
import { Title } from '@angular/platform-browser';
import { NgxMaskPipe } from 'ngx-mask';

type AdvertisementView = {
  content: Advertisement;
  category: Category;
};
@Component({
  selector: 'app-advertisement-view',
  templateUrl: './advertisement-view.component.html',
  styleUrls: ['./advertisement-view.component.css'],
  imports: [
    DynamicDialogModule,
    NgIf,
    AsyncPipe,
    ProgressSpinnerModule,
    NgForOf,
    NgxMaskPipe,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertisementViewComponent implements OnInit {
  advertisement$: Observable<AdvertisementView>;

  selectedImage: number = 0;
  private _userId: string;
  constructor(
    private dialogService: DialogService,
    private advertisementsService: AdvertisementsService,
    private categoriesService: CategoriesService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {}
  ngOnInit(): void {
    const advertisement$ = this.activatedRoute.params.pipe(
      switchMap((params) => this.advertisementsService.getById(params['id'])),
      tap((advertisement) => {
        this.titleService.setTitle(advertisement.name);
        this._userId = advertisement.userId;
      })
    );

    const category$ = advertisement$.pipe(
      switchMap((ad) => this.categoriesService.getById(ad.categoryId!))
    );

    this.advertisement$ = combineLatest(advertisement$, category$).pipe(
      map(([advertisement, category]) => {
        return {
          content: advertisement,
          category,
        };
      })
    );
  }

  showNumber() {
    this.dialogService.open(AdvertisementNumberComponent, {
      header: 'Пользователь',
      width: '516px',
      style: {
        'min-height': '325px',
        margin: '0 12px',
      },
      data: {
        userId: this._userId,
      },
    });
  }

  selectImage(imageIndex: number) {
    if (imageIndex != this.selectedImage) {
      this.selectedImage = imageIndex;
    }
  }
}
