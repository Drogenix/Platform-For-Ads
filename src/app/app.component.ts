import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {HeaderComponent} from "./components/header/header.component";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {LoaderService} from "./core/services/loader.service";
import {AsyncPipe, NgIf} from "@angular/common";
import {SearchComponent} from "./components/search/search.component";
import {Observable} from "rxjs";
import {UserService} from "./core/services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
    imports: [
        HeaderComponent,
        RouterOutlet,
        ProgressSpinnerModule,
        NgIf,
        AsyncPipe,
        SearchComponent
    ],
  standalone: true
})
export class AppComponent implements OnInit{

  loading$: Observable<boolean>
  constructor(private loaderService:LoaderService, private userService:UserService) {}

  ngOnInit(): void {
    this.loading$ = this.loaderService.loading$

    this.userService.checkAuth();
  }
}
