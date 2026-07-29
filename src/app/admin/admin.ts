import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../services/userservice';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserAdmin } from '../models/UserAdmin';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit {
  private userService = inject(UserService);
  users = signal<UserAdmin[]>([]);

  ngOnInit(): void {
    this.userService.getUsers().subscribe(res => {

      const users = res.map(user => ({
        ...user,
        originalRole: user.role
      }));

      this.users.set(users);
    });
  }

  saveRole(user: UserAdmin) {
    this.userService.updateRole(user.userId, user.role).subscribe(updatedUser => {
        const updatedUsers = [...this.users()]; //creez o copie a listei de useri pentru a nu modifica direct semnalul
        const index = updatedUsers.findIndex(u => u.userId === user.userId);  //caut indexul userului modificat in lista de useri

        //actualizez userul modificat in lista de useri cu datele returnate de server si setez originalRole la rolul actualizat
        updatedUsers[index] = {
          ...updatedUser,
          originalRole: updatedUser.role
        };

        this.users.set(updatedUsers); //actuaslizez signalul cu lista de useri actualizata
      });
  }

  //metoda care verifica daca exista modificari in lista de useri comparand rolul curent cu rolul original
  hasPendingChanges(): boolean {
    return this.users().some(user => user.role !== user.originalRole);
  }
}
