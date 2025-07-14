import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {PageDto} from "../models/page/page.dto";
import {StockReportDto} from "../models/stock/dto/stock-report.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReportStockService {

  private base = '/api/report'

  constructor(private http: HttpClient) { }

  list(page: number, limit: number, filter: string): Observable<PageDto<StockReportDto>>{
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if(filter){
      params = params.set('filter', filter);
    }
    return this.http.get<PageDto<StockReportDto>>(`${this.base}/stock`, {params});

  }


}
