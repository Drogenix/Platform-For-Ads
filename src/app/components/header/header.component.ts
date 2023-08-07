import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { UserService } from '../../core/services/user.service';
import { Router, RouterLink } from '@angular/router';
import { OverlayModule } from 'primeng/overlay';
import { AuthDialogService } from '../../core/services/auth-dialog.service';
import { NotificationsService } from '../../core/services/notifications.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, AsyncPipe, RouterLink, OverlayModule],
  standalone: true,
})
export class HeaderComponent {
  userMenuVisible: boolean = false;
  isAuth$ = this.userService.isAuth$;
  constructor(
    private userService: UserService,
    private authDialog: AuthDialogService,
    private router: Router,
    private notificationsService: NotificationsService
  ) {}

  showLogin() {
    this.authDialog.showLogin();
  }

  toggleMenu() {
    this.userMenuVisible = !this.userMenuVisible;
  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl('');
    this.notificationsService.showInfo('Вы вышли из аккаунта');
  }
}
