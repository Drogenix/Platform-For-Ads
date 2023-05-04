import { Injectable, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DestroyService
  extends ReplaySubject<boolean>
  implements OnDestroy
{
  constructor() {
    super(1);
  }

  ngOnDestroy() {
    this.next(true);
    this.complete();
  }
}
