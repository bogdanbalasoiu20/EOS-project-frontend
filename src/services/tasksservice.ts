import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);
  private api = 'http://localhost:8080/tasks';

  getTasks() {
    return this.http.get<any[]>(this.api);
  }

  createTask(task: any) {
    return this.http.post(this.api, task);
  }

  updateTask(taskId: number, task: any) {
    return this.http.patch(`${this.api}/${taskId}`, task);
  }

  deleteTask(taskId: number) {
    return this.http.delete(`${this.api}/${taskId}`);
  }
}
