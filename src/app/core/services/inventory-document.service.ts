import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {InventoryDocument} from "../models/inventory-document/inventory-document.model";
import { Observable } from 'rxjs';
import {
  CreateInventoryDocumentDto,
} from "../models/inventory-document/dto/create-inventory-document.dto";
import {UpdateInventoryDocumentDto} from "../models/inventory-document/dto/update-inventory-document.dto";

@Injectable({
  providedIn: 'root'
})
export class InventoryDocumentService {

  private base = '/api/inventory-documents'

  constructor(private http: HttpClient ) { }

  list(): Observable<InventoryDocument[]> {
    return this.http.get<InventoryDocument[]>(this.base);
  }

  get(id: string): Observable<InventoryDocument> {
    return this.http.get<InventoryDocument>(`${this.base}/${id}`);
  }


  create(doc: Omit<InventoryDocument, 'id'>): Observable<InventoryDocument> {
    return this.http.post<InventoryDocument>(this.base, doc);
  }

  update(id: string, doc: Partial<Omit<InventoryDocument, 'id'>>): Observable<InventoryDocument> {
    return this.http.patch<InventoryDocument>(`${this.base}/${id}`, doc);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }




}
