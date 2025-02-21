import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrdersListResponse } from './model/orders-list-response.model';
import { environment } from 'src/environments/environment.development';
import { Order } from './model/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private url = environment.korp_backend_url;

  constructor(private http: HttpClient) { }

  getOrders(page: number): Observable<OrdersListResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `${token}` })
    return this.http
      .get<OrdersListResponse>(`${this.url}/v1/orders?page=${page}`, { headers });
  }

  createOrder(order: Order): Observable<Order> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `${token}` })
    return this.http.post<Order>(`${this.url}/v1/orders`, order, { headers });
  }

  updateOrder(order: Order): Observable<Order> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `${token}` })
    return this.http.put<Order>(`${this.url}/v1/orders/${order.id}`, order, { headers });
  }

  deleteOrder(id: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `${token}` })
    return this.http.delete<void>(`${this.url}/v1/orders/${id}`, { headers });
  }
}

