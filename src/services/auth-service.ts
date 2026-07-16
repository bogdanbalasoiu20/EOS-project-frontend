import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient);

  login(loginData: any) {
    return this.http.post<any>('http://localhost:8080/auth/login', loginData);
  }

  register(user: any) {
    return this.http.post('http://localhost:8080/users', user);
  }
}