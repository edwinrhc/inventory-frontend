import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductType} from "../models/product-type/ProductType";

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {

  private base = '/api/product-types'

  constructor(
    private http: HttpClient
  ) { }

  list(): Observable<ProductType[]>{
    return this.http.get<ProductType[]>(`${this.base}`);
  }


  get(id: string): Observable<ProductType>{
    return this.http.get<ProductType>(`${this.base}/${id}`);
  }

  create(pt: ProductType): Observable<ProductType>{
    return this.http.post<ProductType>(`${this.base}`, pt);
  }

  update(id: string, pt: Partial<ProductType>): Observable<ProductType>{
    return this.http.patch<ProductType>(`${this.base}/${id}`, pt);
  }

  delete(id: string): Observable<void>{
    return this.http.delete<void>(`${this.base}/${id}`);
  }



}
