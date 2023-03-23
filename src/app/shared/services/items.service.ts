import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ItemType} from "../../../types/item.type";

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  dataUrl: string = 'assets/data.json';
  items: ItemType[] = [];

  constructor(private http: HttpClient) {
  }

  getItems(): Observable<ItemType[]> {
      return this.http.get<ItemType[]>(this.dataUrl);
  }
}
