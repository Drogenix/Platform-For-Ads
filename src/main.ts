import {enableProdMode, importProvidersFrom, InjectionToken} from '@angular/core';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import {provideRouter} from "@angular/router";
import {routes} from "./app/routes";
import {HttpClientModule} from "@angular/common/http";
import {provideEnvironmentNgxMask} from "ngx-mask";

if (environment.production) {
  enableProdMode();
}

export const BACKEND_URL = new InjectionToken<string>('Backend api url');

bootstrapApplication(AppComponent, {
    providers: [
      importProvidersFrom(
      BrowserModule,
      HttpClientModule
    ),
      provideRouter(routes),
      provideEnvironmentNgxMask(),
      {provide:BACKEND_URL, useValue: 'https://fakerapi.it/api/v1/'}
    ]
})
  .catch(err => console.error(err));
