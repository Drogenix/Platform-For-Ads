import {Component, OnInit} from '@angular/core';
import {AdvertisementsService} from "../../core/services/advertisements.service";
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-advertisements',
  templateUrl: './advertisements.component.html',
  styleUrls: ['./advertisements.component.css'],
  providers: [AdvertisementsService],
  imports: [
    NgIf,
    NgForOf,
    AsyncPipe,
    JsonPipe
  ],
  standalone: true
})
export class AdvertisementsComponent implements OnInit{

  response$ = this.advertisementsService.getAll();
  constructor(public advertisementsService: AdvertisementsService) {
  }

  ngOnInit(): void {

  }

}
