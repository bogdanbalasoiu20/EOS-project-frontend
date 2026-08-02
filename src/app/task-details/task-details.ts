import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute} from '@angular/router';
import { TaskService } from '../../services/tasksservice';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-details.html',
  styleUrl: './task-details.css'
})
export class TaskDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private taskService = inject(TaskService);

  task = signal<any>(null);

  ngOnInit(): void {
    const taskId = Number(this.route.snapshot.paramMap.get('taskId'));

    this.taskService.getTaskById(taskId).subscribe(res => {
      this.task.set(res);
    });
  }
}