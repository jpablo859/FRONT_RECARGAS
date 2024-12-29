import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments";
import { Observable } from "rxjs";

@Injectable()
export class SaleService {
    constructor(
        private readonly httpClient: HttpClient
    ) { }
    getAllOperatos(): Observable<any[]> {
        return this.httpClient.get<any[]>(`${environment.serverApiUrl}operator/all`)
    }

    getSeller(sellerId: number): Observable<any> {
        return this.httpClient.get<any[]>(`${environment.serverApiUrl}seller/${sellerId}`)
    }

    saveSale(body: any): Observable<any> {
        return this.httpClient.post(`${environment.serverApiUrl}sale/save`, body)
    }

    getSummary(): Observable<any[]> {
        return this.httpClient.get<any[]>(`${environment.serverApiUrl}sale/summary`)
    }
}