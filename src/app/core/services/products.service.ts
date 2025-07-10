import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../models/product/product";
import {Observable} from "rxjs";
import {CreateProductDto} from "../models/product/dto/create-product.dto";
import {UpdateProductoDto} from "../models/product/dto/update-producto.dto";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private base = '/api/products'

  constructor(private http: HttpClient) { }

  list(){
    return this.http.get<Product[]>(`${this.base}`);
  }

  get(id:string): Observable<Product>{
    return this.http.get<Product>(`${this.base}/${id}`);
  }

  create(dto: CreateProductDto): Observable<Product>{
    return this.http.post<Product>(`${this.base}`, dto);
  }

  update(id: string, dto: UpdateProductoDto): Observable<Product>{
    return this.http.patch<Product>(`${this.base}/${id}`, dto);
  }

  remove(id:string): Observable<void>{
    return this.http.delete<void>(`${this.base}/${id}`);
  }

}
