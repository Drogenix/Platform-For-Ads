import {enableProdMode, importProvidersFrom, InjectionToken} from '@angular/core';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import {provideRouter} from "@angular/router";
import {routes} from "./app/routes";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {provideEnvironmentNgxMask} from "ngx-mask";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {LoaderInterceptor} from "./app/core/interceptors/loader.interceptor";
import {DialogService, DynamicDialogModule} from "primeng/dynamicdialog";

if (environment.production) {
  enableProdMode();
}

export const BACKEND_URL = new InjectionToken<string>('Backend api url');

bootstrapApplication(AppComponent, {
    providers: [
      importProvidersFrom(
      BrowserModule,
        BrowserAnimationsModule,
      HttpClientModule,
        DynamicDialogModule
      ),
      provideRouter(routes),
      provideEnvironmentNgxMask(),
      DialogService,
      {provide:BACKEND_URL, useValue: 'http://localhost:4200/api/'},
      {provide:HTTP_INTERCEPTORS, useClass:LoaderInterceptor, multi:true}
    ]
})
  .catch(err => console.error(err));
