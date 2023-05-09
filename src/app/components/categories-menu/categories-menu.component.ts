import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AsyncPipe,
  JsonPipe,
  NgForOf,
  NgIf,
  NgTemplateOutlet,
} from '@angular/common';
import { OverlayModule } from 'primeng/overlay';
import { CategoriesService } from '../../core/services/categories.service';

@Component({
  selector: 'app-categories-menu',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    OverlayModule,
    AsyncPipe,
    JsonPipe,
    NgTemplateOutlet,
  ],
  templateUrl: './categories-menu.component.html',
  styleUrls: ['./categories-menu.component.css'],
})
export class CategoriesMenuComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  selected = 0;
  categories$ = this.categoriesService.getAll();

  constructor(private categoriesService: CategoriesService) {}

  changeSelected(selected: number) {
    this.selected = selected;
  }
}
