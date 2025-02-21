import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { SuppliersListResponse } from './model/suppliers-list-response.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Supplier } from './model/suppliers.model';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {

  private url = environment.korp_backend_url

  constructor(private http: HttpClient) { }

  getSuppliers(page: number): Observable<SuppliersListResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `${token}` })
    return this.http
      .get<SuppliersListResponse>(`${this.url}/v1/suppliers?page=${page}`, { headers });
  }

  createSupplier(supplier: Supplier): Observable<Supplier> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `${token}` })
    return this.http.post<Supplier>(`${this.url}/v1/suppliers`, supplier, { headers });
  }

  updateSupplier(supplier: Supplier): Observable<Supplier> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `${token}` })
    return this.http.put<Supplier>(`${this.url}/v1/suppliers/${supplier.id}`, supplier, { headers });
  }

  deleteSupplier(id: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `${token}` })
    return this.http.delete<void>(`${this.url}/v1/suppliers/${id}`, { headers });
  }
}
