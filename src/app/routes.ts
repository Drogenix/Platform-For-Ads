import {Routes} from "@angular/router";

export const routes: Routes = [
  {
    path:'', redirectTo:'advertisements', pathMatch:'full'
  },
  {
    path:'advertisements', title:'Объявления',
    loadComponent: () => import('src/app/pages/advertisements/advertisements.component').then(mod => mod.AdvertisementsComponent)
  },
  {
    path:'advertisements/:id', title:'Объявление | Macbook pro 13 2020',
    loadComponent: () => import('src/app/pages/advertisement-page/advertisement-page.component').then(mod => mod.AdvertisementPageComponent)
  },
  {
    path:'account/settings', title:'Настройки',
    loadComponent: () => import('src/app/pages/user-settings/user-settings.component').then(mod => mod.UserSettingsComponent)
  },
  {
    path:'account/advertisements', title:'Мои объявления',
    loadComponent: () => import('src/app/pages/user-advertisements/user-advertisements.component').then(mod => mod.UserAdvertisementsComponent)
  },

]
