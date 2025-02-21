import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { UsersListResponse } from './model/users-list-response.model';
import { Observable } from 'rxjs';
import { UserResponse } from './model/user-response.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url = environment.korp_backend_url

  constructor(private http: HttpClient) { }

  me(): Observable<UserResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `${token}` })
    return this.http
      .get<UserResponse>(`${this.url}/v1/users/me`, { headers });
  }

  getUsers(page: number): Observable<UsersListResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `${token}` })
    return this.http
      .get<UsersListResponse>(`${this.url}/v1/users?page=${page}`, { headers });
  }

  deleteUser(id: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `${token}` })
    return this.http.delete<void>(`${this.url}/v1/users/${id}`, { headers });
  }
}
