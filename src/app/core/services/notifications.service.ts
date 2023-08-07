import { Injectable } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { NotificationComponent } from '../../components/notification/notification.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private dialogService: DialogService) {}
  showInfo(message: string) {
    const ref = this.dialogService.open(NotificationComponent, {
      closable: false,
      position: 'bottom',
      modal: false,
      data: {
        message: message,
      },
      styleClass: 'notification',
    });

    setTimeout(() => ref.close(), 2000);
  }
}
