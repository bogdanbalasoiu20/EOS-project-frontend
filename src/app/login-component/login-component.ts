import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css'
})
export class LoginComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  isLogin = true;

  loginData = {
    email: '',
    password: ''
  };

  registerData = {
    username: '',
    email: '',
    password: '',
    birthDate: ''
  };

  message = '';

  login() {
  this.authService.login(this.loginData).subscribe({
    next: (res) => {
      localStorage.setItem('username', res.username);
      this.message = res.message;
      this.router.navigate(['/home']);
    },
    error: (err) => {
      this.message = err.error.message;
    }
  });
}

  register() {
  this.authService.register(this.registerData).subscribe({
    next: () => {
      this.loginData.email = this.registerData.email;
      this.loginData.password = this.registerData.password;

      this.login();
    },
    error: (err) => {
      this.message = err.error.message;
    }
  });
}
}