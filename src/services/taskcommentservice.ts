import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TaskComment } from '../app/models/TaskComment';

@Injectable({
  providedIn: 'root'
})
export class TaskCommentService {
  private http = inject(HttpClient);
  private api = 'http://localhost:8080/tasks';

  getComments(taskId: number) {
    return this.http.get<TaskComment[]>(`${this.api}/${taskId}/comments`);
  }

  createComment(taskId: number, body: any) {
    return this.http.post<TaskComment>(`${this.api}/${taskId}/comments`, body);
  }

  updateComment(taskId: number, commentId: number, body: any) {
    return this.http.patch<TaskComment>(`${this.api}/${taskId}/comments/${commentId}`, body);
  }

  deleteComment(taskId: number, commentId: number) {
    return this.http.delete(`${this.api}/${taskId}/comments/${commentId}`);
  }
}