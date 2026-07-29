import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserAdmin } from '../app/models/UserAdmin';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);
  private api = 'http://localhost:8080/users';

  getUsers() {
    return this.http.get<any[]>(this.api);
  }

  updateRole(userId: number, role: string) {
    return this.http.patch<UserAdmin>(`${this.api}/${userId}/role`, { role });
  }

}
