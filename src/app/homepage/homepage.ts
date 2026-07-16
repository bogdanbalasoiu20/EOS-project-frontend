import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage implements OnInit {
  username = "";
  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';
  }
}
