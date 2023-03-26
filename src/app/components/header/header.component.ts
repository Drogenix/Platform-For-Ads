import { Component } from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {UserService} from "../../core/services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [NgIf, AsyncPipe],
  standalone:true
})
export class HeaderComponent {

  constructor(public userService:UserService) {
  }
}
