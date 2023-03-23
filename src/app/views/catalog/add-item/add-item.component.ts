import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ItemType} from "../../../../types/item.type";
import {ItemsService} from "../../../shared/services/items.service";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CustomValidators} from "../../../shared/common/custom-validators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  newItemForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(4), CustomValidators.titleItemValidator]],
    description: ['', Validators.required],
    full: ['', Validators.required]
  });

  items: ItemType[] = [];
  maxId:number = 0;

  constructor(private fb: FormBuilder,
              private itemsService: ItemsService,
              private _snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('items')) {
      this.items = JSON.parse(localStorage.getItem('items')!);
      this.maxId = Math.max.apply(null, this.items.map(item => +item.id));
    } else {
      this.itemsService.getItems()
        .subscribe({
          next: (data: ItemType[]) => {
            this.items = data;
            this.maxId = Math.max.apply(null, data.map(item => +item.id));
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
  addNewItem(): void{
    const newItemData: ItemType = {
      title: this.newItemForm.value.title ? this.newItemForm.value.title : '',
      description: this.newItemForm.value.description ? this.newItemForm.value.description : '',
      full: this.newItemForm.value.full ? this.newItemForm.value.full : '',
      id: this.maxId + 1
    }

    this.items.push(newItemData);
    localStorage.setItem('items', JSON.stringify(this.items));
    this.router.navigate(['/items']);
  }
}
