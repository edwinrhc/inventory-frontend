import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductType} from "../models/product-type/ProductType";
import {PageDto} from "../models/page/page.dto";

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {

  private base = '/api/product-types'

  constructor(
    private http: HttpClient
  ) { }

  // list(): Observable<ProductType[]>{
  //   return this.http.get<ProductType[]>(`${this.base}`);
  // }

  list(page: number, limit: number, filter: string): Observable<PageDto<ProductType>>{
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    if(filter){
      params = params.set('filter', filter);
    }
    return this.http.get<PageDto<ProductType>>(`${this.base}`, {params});
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

  remove(id: string): Observable<void>{
    return this.http.delete<void>(`${this.base}/${id}`);
  }
  updateStatus(id: string, isActive: boolean): Observable<ProductType>{
    return this.http.patch<ProductType>(`/api/product-types/${id}/status`,
      {isActive});
  }



}
