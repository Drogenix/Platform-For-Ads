import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {UserService} from "../../core/services/user.service";
import {AuthComponent} from "../auth/auth.component";
import {RouterLink} from "@angular/router";
import {OverlayModule} from "primeng/overlay";
import {AuthDialogService} from "../../core/services/auth-dialog.service";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, AsyncPipe, AuthComponent, RouterLink, OverlayModule],
  standalone:true
})
export class HeaderComponent {
  isAuth$ = this.userService.isAuth$;
  overlayVisible:boolean = false;
  constructor(private userService:UserService, private authDialog:AuthDialogService) {
  }

  showAuth(){
    this.authDialog.showAuth();
  }

  toggleMenu(){
    this.overlayVisible = !this.overlayVisible;
  }

  logout(){
    this.userService.logout();
  }
}
