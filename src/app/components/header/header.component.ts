import {Component, ViewChild} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {UserService} from "../../core/services/user.service";
import {AuthComponent} from "../auth/auth.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [NgIf, AsyncPipe, AuthComponent],
  standalone:true
})
export class HeaderComponent {

  @ViewChild(AuthComponent) private _authRef:AuthComponent
  constructor(public userService:UserService) {
  }

  showAuth(){
    this._authRef.show()
  }
}
