import { Component, signal } from '@angular/core';
import {Router,RouterLink,RouterLinkActive,RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('proiect-eos');
  username = '';

  constructor(private router: Router) {}

  showNavbar(): boolean {
    return this.router.url !== '/login';
  }

  isLoggedIn(): boolean {
    this.username = localStorage.getItem('username') ?? '';
    return this.username !== '';
  }

  logout(): void {
    localStorage.removeItem('username');
    this.router.navigate(['/home']);
  }
}