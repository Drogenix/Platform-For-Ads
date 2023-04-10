import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-number-modal',
  templateUrl: './number-modal.component.html',
  styleUrls: ['./number-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class NumberModalComponent {

}
