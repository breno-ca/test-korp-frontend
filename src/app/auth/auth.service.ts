import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { SignIn } from './model/signin.model';
import { SignInResponse } from './model/signin-response.model';

import { environment } from 'src/environments/environment.development';
import { tap } from 'rxjs/operators';
import { SignUp } from './model/signup.model';
import { SignUpResponse } from './model/signup-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.korp_backend_url;

  constructor(private http: HttpClient, private router: Router) { }

  signIn(signIn: SignIn): Observable<SignInResponse> {
    return this.http
      .post<SignInResponse>(`${this.url}/v1/auth/signin`, signIn)
      .pipe(
        tap({
          next: (response: SignInResponse) => {
            if (response?.data?.token) {
              localStorage.setItem('token', response.data.token)
            }
          },
          error: (error) => {
            console.error('login error:', error);
          }
        })
      );
  }

  signUp(signUp: SignUp): Observable<SignUpResponse> {
    return this.http.post<SignUpResponse>(`${this.url}/v1/auth/signup`, signUp);
  }

  getToken(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  signOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
