import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ItemsService} from "../../../shared/services/items.service";
import {ItemType} from "../../../../types/item.type";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {
  item: ItemType | null = null;
  items: ItemType[] | null = null;
  constructor(private activatedRoute: ActivatedRoute,
              private itemsService: ItemsService,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('items')) {
      this.items = JSON.parse(localStorage.getItem('items')!);
      this.getItemId();
    } else {
      this.itemsService.getItems()
        .subscribe({
          next: (data: ItemType[]) => {
            this.items = data;
            localStorage.setItem('items', JSON.stringify(data));
            this.getItemId();
          },
          error: (errorResponse: HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              this._snackBar.open(errorResponse.error.message);
            } else {
              this._snackBar.open('Произошла ошибка');
            }
          }
        });
    }
  }

  getItemId(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id'] && this.items) {
        const findItem = this.items.find(item => item.id == params['id'])
        if (findItem) {
          this.item = findItem;
        }
      }
    })
  }
}
