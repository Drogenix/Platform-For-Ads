import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-advertisement-number',
  templateUrl: './advertisement-number.component.html',
  styleUrls: ['./advertisement-number.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AsyncPipe, NgxMaskPipe, NgIf],
})
export class AdvertisementNumberComponent implements OnInit {
  number$: Observable<string>;
  constructor(
    private userService: UserService,
    private dialogConfig: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    const userId = this.dialogConfig.data.userId;

    this.number$ = this.userService.getUserPhone(userId);
  }
}
