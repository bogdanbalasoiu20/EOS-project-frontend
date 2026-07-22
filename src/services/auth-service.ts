import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserResponse } from '../app/models/user-response';
import { LoginResponse } from '../app/models/login-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient);

  login(loginData: any) {
    const loginRequest = {
        email: btoa(loginData.email),
        password: btoa(loginData.password)
      };

    return this.http.post<LoginResponse>('http://localhost:8080/auth/login', loginRequest);
  }

  register(registerData: any) {
    const registerRequest = {
      username: btoa(registerData.username),
      email: btoa(registerData.email),
      password: btoa(registerData.password),
      birthDate: registerData.birthDate
    };

    return this.http.post<UserResponse>('http://localhost:8080/auth/register', registerRequest);
  }
} 