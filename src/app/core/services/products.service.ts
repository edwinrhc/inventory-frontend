import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private base = '/api/products'

  constructor(private http: HttpClient) { }

  list(){
    return this.http.get<Product[]>(`${this.base}`);
  }
}
