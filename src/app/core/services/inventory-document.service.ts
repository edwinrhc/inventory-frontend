import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {InventoryDocument} from "../models/inventory-document/inventory-document.model";
import {map, Observable} from 'rxjs';
import {
  CreateInventoryDocumentDto,
} from "../models/inventory-document/dto/create-inventory-document.dto";
import {UpdateInventoryDocumentDto} from "../models/inventory-document/dto/update-inventory-document.dto";
import {PageDto} from "../models/page/page.dto";
import {CreateInventoryResponse} from "../models/inventory-document/dto/create-inventory-response";

@Injectable({
  providedIn: 'root'
})
export class InventoryDocumentService {

  private base = '/api/inventory-documents'

  constructor(private http: HttpClient) {
  }

  list(page: number, limit: number, filter: string): Observable<PageDto<InventoryDocument>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (filter) {
      params = params.set('filter', filter);
    }
    return this.http.get<PageDto<InventoryDocument>>(`${this.base}`, {params});
  }

  get(id: string): Observable<InventoryDocument> {
    return this.http.get<InventoryDocument>(`${this.base}/${id}`);
  }

  peekNextReference(type: 'IN' | 'OUT'): Observable<string> {
    return this.http.get(`${this.base}/peek-reference`,
      {
        params: {type},
        responseType: 'text'
      });
  }

  create(doc: Omit<InventoryDocument, 'id'>): Observable<CreateInventoryResponse> {
    return this.http.post<CreateInventoryResponse>(this.base, doc);
  }

  getStock(productId: string): Observable<number>{
    return this.http.get<{ quantity: number }>(
      `${this.base}/inventory-items/${productId}`
    ).pipe(map(res => res.quantity));
  }

  update(id: string, doc: Partial<Omit<InventoryDocument, 'id'>>): Observable<InventoryDocument> {
    return this.http.patch<InventoryDocument>(`${this.base}/${id}`, doc);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }





}
