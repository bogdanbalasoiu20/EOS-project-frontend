import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserAdmin } from '../app/models/UserAdmin';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);
  private api = 'http://localhost:8080/users';

  getUsers(keyword?: string) {
    let params = new HttpParams();

    if (keyword) {
      params = params.set('keyword', keyword);
    }

    return this.http.get<any[]>(this.api, { params });
  }

  updateRole(userId: number, role: string) {
    return this.http.patch<UserAdmin>(`${this.api}/${userId}/role`, { role });
  }

}
