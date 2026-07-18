import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);
  private api = 'http://localhost:8080/users';

  getUsers() {
    return this.http.get<any[]>(this.api);
  }

}
