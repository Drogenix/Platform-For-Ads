import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { OverlayModule } from 'primeng/overlay';
import { Category } from '../../core/entities/category';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories-menu',
  standalone: true,
  imports: [NgIf, NgForOf, OverlayModule, AsyncPipe, RouterLink],
  templateUrl: './categories-menu.component.html',
  styleUrls: ['./categories-menu.component.css'],
})
export class CategoriesMenuComponent {
  @Input() visible: boolean = false;
  @Input() categories: Category[];
  @Output() visibleChange = new EventEmitter<boolean>();
  selected = 0;

  constructor() {}

  changeSelected(selected: number) {
    this.selected = selected;
  }
}
