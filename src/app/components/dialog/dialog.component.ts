import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class DialogComponent {
  @Input() header: string;

  @Input() maxWidth: string = '516px';

  private _state: 'opened' | 'closed' = 'closed';

  get state(){
    return this._state;
  }

  @ViewChild('dialog') private _dialog:ElementRef;

  @ViewChild('closeButton') private _closeButton:ElementRef;

  @HostListener('click', ['$event'])
  onClick(event:Event){

    const targetElement = event.target as HTMLElement;

    if(this.isClickInsideButtonOrOutside(targetElement))
    {
      this.close()
    }

  }

  constructor() {}

  close(){
    this._state = 'closed';
  }

  open(){
    this._state = 'opened';
  }

  private isClickInsideButtonOrOutside(elementToCheck: HTMLElement):boolean
  {
    return !(elementToCheck === this._dialog.nativeElement || this._dialog.nativeElement.contains(elementToCheck)) ||
      (elementToCheck === this._closeButton.nativeElement || this._closeButton.nativeElement.contains(elementToCheck))
  }

}
