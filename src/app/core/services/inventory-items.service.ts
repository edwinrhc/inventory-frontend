import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class InventoryItemsService {


  private base = '/api/inventory-items'

  constructor(private http: HttpClient) {
  }


  getInventoryItem(productId: string): Observable<{productId: string; quantity: number}>{
    return this.http.get<{productId: string; quantity: number}>(
      `${this.base}/${productId}`
    );
  }
}
