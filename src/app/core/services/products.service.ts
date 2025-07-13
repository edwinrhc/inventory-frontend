import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Product} from "../models/product/product";
import {Observable} from "rxjs";
import {CreateProductDto} from "../models/product/dto/create-product.dto";
import {UpdateProductoDto} from "../models/product/dto/update-producto.dto";
import {PageDto} from "../models/page/page.dto";
import {InventoryDocument} from "../models/inventory-document/inventory-document.model";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private base = '/api/products'

  constructor(private http: HttpClient) {
  }

  listSinPaginar(){
    return this.http.get<Product[]>(`${this.base}/listar-sin-paginar`);
  }

  list(page: number, limit: number, filter: string): Observable<PageDto<Product>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    if (filter) {
      params = params.set('filter', filter);
    }
    return this.http.get<PageDto<Product>>(`${this.base}`, {params});
  }


  get(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.base}/${id}`);
  }

  create(dto: CreateProductDto): Observable<Product> {
    return this.http.post<Product>(`${this.base}`, dto);
  }

  update(id: string, dto: UpdateProductoDto): Observable<Product> {
    return this.http.patch<Product>(`${this.base}/${id}`, dto);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }

  updateStatus(id: string, isActive: boolean): Observable<Product>{
    return this.http.patch<Product>(`/api/products/${id}/status`,
      {isActive});
  }

}
