import {Component, OnInit} from '@angular/core';
import {ItemsService} from "../../../shared/services/items.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ItemType} from "../../../../types/item.type";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  items: ItemType[] = [];
  constructor(private itemsService: ItemsService,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    if (localStorage.getItem('items')) {
      this.items = JSON.parse(localStorage.getItem('items')!);
    } else {
      this.itemsService.getItems()
        .subscribe({
          next: (data: ItemType[]) => {
            this.items = data;
            localStorage.setItem('items', JSON.stringify(data));
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

}
