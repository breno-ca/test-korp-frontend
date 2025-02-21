import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Customer } from './model/customers.model';
import { CustomerListNoPaginationResponse, CustomerListResponse } from './model/customers-list-response.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private url = environment.korp_backend_url

  constructor(private http: HttpClient) { }

  getCustomers(page: number): Observable<CustomerListResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `${token}` })
    return this.http
      .get<CustomerListResponse>(`${this.url}/v1/customers?page=${page}`, { headers });
  }

  getCustomersForOrders(): Observable<CustomerListNoPaginationResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `${token}` })
    return this.http
      .get<CustomerListNoPaginationResponse>(`${this.url}/v1/customers/short`, { headers });
  }

  createCustomer(customer: Customer): Observable<Customer> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `${token}` })
    return this.http.post<Customer>(`${this.url}/v1/customers`, customer, { headers });
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `${token}` })
    return this.http.put<Customer>(`${this.url}/v1/customers/${customer.id}`, customer, { headers });
  }

  deleteCustomer(id: string): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `${token}` });

    return this.http.delete<void>(`${this.url}/v1/customers/${id}`, { headers }).pipe(
      catchError(error => {
        // Verifica se o erro contém a mensagem específica
        if (error.status === 422 && error.error?.message?.includes('a foreign key constraint fails')) {
          return throwError(() => new Error('Não é possível excluir o cliente, há um ou mais registros de pedidos vinculados.'));
        }

        // Retorna uma mensagem de erro genérica caso não seja o erro esperado
        return throwError(() => new Error('Ocorreu um erro ao excluir o cliente.'));
      })
    );
  }

}
