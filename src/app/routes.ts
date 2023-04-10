import {ActivatedRouteSnapshot, createUrlTreeFromSnapshot, Routes} from "@angular/router";
import {inject} from "@angular/core";
import {AuthDialogService} from "./core/services/auth-dialog.service";
import {UserService} from "./core/services/user.service";
import {map, take} from "rxjs";

const HasAuthorizedGuard = (route:ActivatedRouteSnapshot) => {
  const authDialogService = inject(AuthDialogService);

  const userService = inject(UserService);

  return userService.isAuth$.pipe(
    map((isAuth) => {
      if(!isAuth)
      {
        authDialogService.showAuth();
        return createUrlTreeFromSnapshot(route, route.url)
      }
      return isAuth;
    }),
    take(1)
  )
};


export const routes: Routes = [
  {
    path:'', redirectTo:'advertisements', pathMatch:'full'
  },
  {
    path:'advertisements', title:'Объявления',
    loadComponent: () => import('src/app/pages/advertisements/advertisements.component').then(mod => mod.AdvertisementsComponent)
  },
  {
    path:'advertisements/create', title:'Новое объявление',
    loadComponent: () => import('src/app/pages/advertisement-create/advertisement-create.component').then(mod => mod.AdvertisementCreateComponent),
    canActivate:[HasAuthorizedGuard]
  },
  {
    path:'advertisements/:id', title:'Объявление | Macbook pro 13 2020',
    loadComponent: () => import('src/app/pages/advertisement-view/advertisement-view.component').then(mod => mod.AdvertisementViewComponent)
  },
  {
    path:'account/settings', title:'Настройки',
    loadComponent: () => import('src/app/pages/user-settings/user-settings.component').then(mod => mod.UserSettingsComponent),
    canActivate:[HasAuthorizedGuard]
  },
  {
    path:'account/advertisements', title:'Мои объявления',
    loadComponent: () => import('src/app/pages/user-advertisements/user-advertisements.component').then(mod => mod.UserAdvertisementsComponent),
    canActivate:[HasAuthorizedGuard]
  },

]
