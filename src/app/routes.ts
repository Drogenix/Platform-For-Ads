import {Routes} from "@angular/router";

export const routes: Routes = [
  {
    path:'', redirectTo:'advertisements', pathMatch:'full'
  },
  {
    path:'advertisements', title:'Объявления',
    loadComponent: () => import('src/app/pages/advertisements/advertisements.component').then(mod => mod.AdvertisementsComponent)
  },
]
