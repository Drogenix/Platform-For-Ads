import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {HeaderComponent} from "./components/header/header.component";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import {AsyncPipe, NgIf} from "@angular/common";
import {SearchComponent} from "./components/search/search.component";
import {UserService} from "./core/services/user.service";
import {ErrorService} from "./core/services/error.service";

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

  error$ = this.errorService.error$;

  constructor(private userService:UserService, private errorService:ErrorService) {}

  ngOnInit(): void {
    this.userService.checkAuth();
  }
}
