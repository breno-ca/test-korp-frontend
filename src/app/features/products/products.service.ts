import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Product } from './model/product.model';
import { Observable } from 'rxjs';
import { ProductsListResponse } from './model/products-list-response';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private url = environment.korp_backend_url

  constructor(private http: HttpClient) { }

  getProducts(page: number): Observable<ProductsListResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `${token}` })
    return this.http
      .get<ProductsListResponse>(`${this.url}/v1/products?page=${page}`, { headers });
  }

  createProduct(product: Product): Observable<Product> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `${token}` })
    return this.http.post<Product>(`${this.url}/v1/products`, product, { headers });
  }

  updateProduct(product: Product): Observable<Product> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `${token}` })
    return this.http.put<Product>(`${this.url}/v1/products/${product.id}`, product, { headers });
  }

  deleteProduct(id: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `${token}` })
    return this.http.delete<void>(`${this.url}/v1/products/${id}`, { headers });
  }
}
