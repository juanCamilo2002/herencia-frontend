import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Seller } from '../models/seller';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellersService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl + 'sellers';

  getAll(): Observable<Seller[]> {
    return this.http.get<Seller[]>(this.apiUrl);
  }

  getById(id: string): Observable<Seller> {
    return this.http.get<Seller>(`${this.apiUrl}/${id}`);
  }

  create(seller: Partial<Seller>): Observable<Seller> {
    return this.http.post<Seller>(this.apiUrl, seller);
  }

  update(id: string, seller: Partial<Seller>): Observable<Seller> {
    return this.http.patch<Seller>(`${this.apiUrl}/${id}`, seller);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
