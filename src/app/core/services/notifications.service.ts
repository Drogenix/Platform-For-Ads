import { Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NotificationComponent } from '../../components/notification/notification.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private dialogService: DialogService) {}

  private _dialogRef: DynamicDialogRef;

  showInfo(message: string) {
    if (this._dialogRef) this._dialogRef.close();

    this._dialogRef = this.dialogService.open(NotificationComponent, {
      closable: false,
      position: 'bottom',
      showHeader: false,
      modal: false,
      data: {
        message: message,
      },
      styleClass: 'notification',
    });

    setTimeout(() => this._dialogRef.close(), 2000);
  }
}
