import { ChangeDetectionStrategy, Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {NgxMaskDirective} from "ngx-mask";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgIf, NgxMaskDirective
  ],
})
export class UserSettingsComponent {

}
