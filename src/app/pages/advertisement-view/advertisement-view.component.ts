import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { AdvertisementNumberComponent } from '../../components/advertisement-number/advertisement-number.component';
import { AdvertisementsService } from '../../core/services/advertisements.service';
import { combineLatest, map, Observable, switchMap } from 'rxjs';
import { Advertisement } from '../../core/entities/advertisement';
import { ActivatedRoute } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Category } from '../../core/entities/category';
import { CategoriesService } from '../../core/services/categories.service';

type AdvertisementView = {
  content: Advertisement;
  category: Category;
};
@Component({
  selector: 'app-advertisement-view',
  templateUrl: './advertisement-view.component.html',
  styleUrls: ['./advertisement-view.component.css'],
  providers: [DialogService],
  imports: [DynamicDialogModule, NgIf, AsyncPipe, ProgressSpinnerModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvertisementViewComponent implements OnInit {
  advertisement$: Observable<AdvertisementView>;
  constructor(
    private dialogService: DialogService,
    private advertisementsService: AdvertisementsService,
    private categoriesService: CategoriesService,
    private activatedRoute: ActivatedRoute
  ) {}
  showNumber() {
    this.dialogService.open(AdvertisementNumberComponent, {
      header: 'Пользователь',
      width: '516px',
    });
  }

  ngOnInit(): void {
    const ad$ = this.activatedRoute.params.pipe(
      switchMap((params) => this.advertisementsService.getById(params['id']))
    );

    const category$ = ad$.pipe(
      switchMap((ad) => this.categoriesService.getById(ad.categoryId))
    );

    this.advertisement$ = combineLatest(ad$, category$).pipe(
      map(([ad, category]) => {
        return {
          content: ad,
          category,
        };
      })
    );
  }
}
