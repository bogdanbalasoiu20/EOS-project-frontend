import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage implements OnInit {

  username = '';
  isLoggedIn = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}  // Injectăm PLATFORM_ID pentru a verifica dacă codul rulează în browser sau pe server

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {  //codul se executa doar daca rulez in browser, nu si pe server
      this.username = localStorage.getItem('username') ?? '';
      this.isLoggedIn = this.username !== '';
    }
  }
}