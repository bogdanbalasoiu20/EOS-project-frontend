import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);
  private api = 'http://localhost:8080/tasks';

  getTasks(filters: any) {
    let params = new HttpParams();

    if (filters.keyword) {
      params = params.set('keyword', filters.keyword);
    }

    if (filters.status) {
      params = params.set('status', filters.status);
    }

    if (filters.userId != null) {
      params = params.set('userId', filters.userId);
    }

    if (filters.unassigned) {
      params = params.set('unassigned', 'true');
    }

    if (filters.dueDate) {
      params = params.set('dueDate', filters.dueDate);
    }

    return this.http.get<any[]>(this.api, { params });
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
